-- THE INDIAN STARTUP - Purchase Transaction Integrity
-- Migration: 20260129_005_purchase_transaction.sql
-- Purpose: Atomic transaction function for completing purchases

-- ================================================
-- INCREMENT USER XP FUNCTION
-- ================================================
CREATE OR REPLACE FUNCTION increment_user_xp(user_id TEXT, xp_amount INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE "User"
    SET "totalXP" = COALESCE("totalXP", 0) + xp_amount,
        "updatedAt" = NOW()
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- COMPLETE PURCHASE FUNCTION (Atomic Transaction)
-- ================================================
CREATE OR REPLACE FUNCTION complete_purchase(
    p_purchase_id TEXT,
    p_payment_id TEXT,
    p_signature TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_purchase RECORD;
    v_xp_amount INTEGER := 100;
    v_result JSONB;
BEGIN
    -- Get the purchase with product info
    SELECT p.*, prod.code as product_code, prod.title as product_title
    INTO v_purchase
    FROM "Purchase" p
    LEFT JOIN "Product" prod ON p."productId" = prod.id
    WHERE p.id = p_purchase_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Purchase not found'
        );
    END IF;

    -- Check if already completed (idempotency)
    IF v_purchase.status = 'completed' THEN
        RETURN jsonb_build_object(
            'success', true,
            'message', 'Purchase already completed',
            'purchaseId', p_purchase_id
        );
    END IF;

    -- Update purchase status
    UPDATE "Purchase"
    SET
        status = 'completed',
        "razorpayPaymentId" = p_payment_id,
        "razorpaySignature" = p_signature,
        "isActive" = true,
        "updatedAt" = NOW()
    WHERE id = p_purchase_id;

    -- Mark coupon as used if applicable
    IF v_purchase."couponId" IS NOT NULL THEN
        UPDATE "Coupon"
        SET
            "currentUses" = "currentUses" + 1,
            "updatedAt" = NOW()
        WHERE id = v_purchase."couponId";
    END IF;

    -- Create XP event
    INSERT INTO "XPEvent" (
        id,
        "userId",
        amount,
        "eventType",
        description,
        metadata,
        "createdAt"
    ) VALUES (
        gen_random_uuid()::text,
        v_purchase."userId",
        v_xp_amount,
        'purchase',
        'Purchased ' || COALESCE(v_purchase.product_title, 'product'),
        jsonb_build_object(
            'purchaseId', p_purchase_id,
            'productCode', v_purchase.product_code
        ),
        NOW()
    );

    -- Update user's total XP
    UPDATE "User"
    SET
        "totalXP" = COALESCE("totalXP", 0) + v_xp_amount,
        "updatedAt" = NOW()
    WHERE id = v_purchase."userId";

    RETURN jsonb_build_object(
        'success', true,
        'purchaseId', p_purchase_id,
        'userId', v_purchase."userId",
        'productCode', v_purchase.product_code,
        'xpAwarded', v_xp_amount
    );

EXCEPTION
    WHEN OTHERS THEN
        -- Transaction will be rolled back automatically
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- HANDLE FAILED PAYMENT FUNCTION
-- ================================================
CREATE OR REPLACE FUNCTION handle_failed_payment(
    p_order_id TEXT,
    p_payment_id TEXT,
    p_error_code TEXT DEFAULT NULL,
    p_error_description TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
BEGIN
    UPDATE "Purchase"
    SET
        status = 'failed',
        "razorpayPaymentId" = p_payment_id,
        metadata = jsonb_build_object(
            'errorCode', p_error_code,
            'errorDescription', p_error_description,
            'failedAt', NOW()
        ),
        "updatedAt" = NOW()
    WHERE "razorpayOrderId" = p_order_id
    AND status = 'pending';

    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Pending purchase not found for order'
        );
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'orderId', p_order_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- GRANT EXECUTE PERMISSIONS
-- ================================================
GRANT EXECUTE ON FUNCTION complete_purchase TO authenticated;
GRANT EXECUTE ON FUNCTION complete_purchase TO service_role;
GRANT EXECUTE ON FUNCTION handle_failed_payment TO service_role;
GRANT EXECUTE ON FUNCTION increment_user_xp TO authenticated;
GRANT EXECUTE ON FUNCTION increment_user_xp TO service_role;
