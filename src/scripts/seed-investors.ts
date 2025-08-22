import { createClient } from '@supabase/supabase-js';
import { INVESTOR_DATA, INVESTOR_CONTACTS } from '../data/investors-seed';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedInvestors() {
  console.log('Starting investor database seeding...');
  console.log(`Total investors to insert: ${INVESTOR_DATA.length}`);
  console.log(`Total contacts to insert: ${INVESTOR_CONTACTS.length}`);

  try {
    // Insert investors in batches of 100
    const batchSize = 100;
    for (let i = 0; i < INVESTOR_DATA.length; i += batchSize) {
      const batch = INVESTOR_DATA.slice(i, i + batchSize);
      
      const { error } = await supabase
        .from('Investor')
        .insert(batch);
      
      if (error) {
        console.error(`Error inserting investor batch ${i / batchSize + 1}:`, error);
        throw error;
      }
      
      console.log(`Inserted investor batch ${i / batchSize + 1} (${batch.length} investors)`);
    }

    // Insert contacts in batches of 100
    for (let i = 0; i < INVESTOR_CONTACTS.length; i += batchSize) {
      const batch = INVESTOR_CONTACTS.slice(i, i + batchSize);
      
      const { error } = await supabase
        .from('InvestorContact')
        .insert(batch);
      
      if (error) {
        console.error(`Error inserting contact batch ${i / batchSize + 1}:`, error);
        throw error;
      }
      
      console.log(`Inserted contact batch ${i / batchSize + 1} (${batch.length} contacts)`);
    }

    console.log('✅ Successfully seeded investor database!');
    console.log(`Total investors: ${INVESTOR_DATA.length}`);
    console.log(`Total contacts: ${INVESTOR_CONTACTS.length}`);

    // Get some stats
    const { data: stats } = await supabase
      .from('Investor')
      .select('type')
      .limit(1000);

    if (stats) {
      const typeCounts = stats.reduce((acc, inv) => {
        acc[inv.type] = (acc[inv.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log('\nInvestor type distribution:');
      Object.entries(typeCounts).forEach(([type, count]) => {
        console.log(`  ${type}: ${count}`);
      });
    }

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
if (require.main === module) {
  seedInvestors()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedInvestors };