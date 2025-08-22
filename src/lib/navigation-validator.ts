import { logger } from '@/lib/logger';

export interface UserState {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  hasProfile: boolean;
  hasActivePurchases: boolean;
  isNewUser: boolean;
  hasSessionExpired: boolean;
}

export interface NavigationRule {
  from: string;
  to: string;
  condition: (userState: UserState) => boolean;
  description: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
}

// Define all navigation rules to prevent loops and ensure proper flow
export const navigationRules: NavigationRule[] = [
  // Authentication Rules
  {
    from: '/login',
    to: '/dashboard',
    condition: (state) => state.isAuthenticated && state.hasCompletedOnboarding,
    description: 'Authenticated users with completed onboarding go to dashboard'
  },
  {
    from: '/login',
    to: '/onboarding',
    condition: (state) => state.isAuthenticated && !state.hasCompletedOnboarding,
    description: 'Authenticated users without onboarding go to onboarding'
  },
  {
    from: '/signup',
    to: '/onboarding',
    condition: (state) => state.isAuthenticated && state.isNewUser,
    description: 'New users after signup go to onboarding'
  },
  
  // Onboarding Rules
  {
    from: '/onboarding',
    to: '/dashboard',
    condition: (state) => state.isAuthenticated && state.hasCompletedOnboarding,
    description: 'Users who complete onboarding go to dashboard'
  },
  {
    from: '/onboarding',
    to: '/login',
    condition: (state) => !state.isAuthenticated,
    description: 'Unauthenticated users are redirected to login'
  },
  
  // Dashboard Rules
  {
    from: '/dashboard',
    to: '/login',
    condition: (state) => !state.isAuthenticated || state.hasSessionExpired,
    description: 'Unauthenticated or expired sessions go to login'
  },
  {
    from: '/dashboard',
    to: '/onboarding',
    condition: (state) => state.isAuthenticated && !state.hasCompletedOnboarding,
    description: 'Authenticated users without onboarding are redirected'
  },
  
  // Protected Routes Rules
  {
    from: '/products/*',
    to: '/login',
    condition: (state) => !state.isAuthenticated,
    description: 'Product pages require authentication'
  },
  {
    from: '/portfolio/*',
    to: '/login',
    condition: (state) => !state.isAuthenticated,
    description: 'Portfolio pages require authentication'
  },
  
  // Auth Callback Rules
  {
    from: '/auth/callback',
    to: '/onboarding',
    condition: (state) => state.isAuthenticated && state.isNewUser,
    description: 'New users from auth callback go to onboarding'
  },
  {
    from: '/auth/callback',
    to: '/dashboard',
    condition: (state) => state.isAuthenticated && state.hasCompletedOnboarding,
    description: 'Existing users from auth callback go to dashboard'
  },
];

// Detect potential navigation loops
export function detectNavigationLoops(rules: NavigationRule[]): string[] {
  const loops: string[] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  function dfs(route: string, path: string[]): void {
    if (recursionStack.has(route)) {
      const loopStart = path.indexOf(route);
      const loop = path.slice(loopStart).concat(route);
      loops.push(`Navigation loop detected: ${loop.join(' -> ')}`);
      return;
    }
    
    if (visited.has(route)) return;
    
    visited.add(route);
    recursionStack.add(route);
    
    // Find all possible destinations from this route
    const destinations = rules
      .filter(rule => rule.from === route || rule.from.includes('*') && route.startsWith(rule.from.replace('*', '')))
      .map(rule => rule.to);
    
    for (const dest of destinations) {
      dfs(dest, [...path, route]);
    }
    
    recursionStack.delete(route);
  }
  
  // Check from all possible starting points
  const allRoutes = new Set([
    ...rules.map(r => r.from),
    ...rules.map(r => r.to)
  ]);
  
  for (const route of allRoutes) {
    if (!visited.has(route)) {
      dfs(route, []);
    }
  }
  
  return loops;
}

// Validate user navigation flow
export function validateUserFlow(userState: UserState, currentRoute: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  // Check for authentication state mismatches
  if (!userState.isAuthenticated && currentRoute.startsWith('/dashboard')) {
    errors.push('Unauthenticated user accessing dashboard');
    recommendations.push('Redirect to /login');
  }
  
  if (!userState.isAuthenticated && currentRoute.startsWith('/products')) {
    errors.push('Unauthenticated user accessing protected product routes');
    recommendations.push('Redirect to /login');
  }
  
  if (userState.isAuthenticated && !userState.hasCompletedOnboarding && currentRoute === '/dashboard') {
    errors.push('User accessing dashboard without completing onboarding');
    recommendations.push('Redirect to /onboarding');
  }
  
  if (userState.isAuthenticated && userState.hasCompletedOnboarding && currentRoute === '/onboarding') {
    warnings.push('User accessing onboarding after completion');
    recommendations.push('Redirect to /dashboard');
  }
  
  if (userState.hasSessionExpired && currentRoute !== '/login') {
    errors.push('Session expired but user not redirected to login');
    recommendations.push('Clear session and redirect to /login');
  }
  
  // Check for missing profile
  if (userState.isAuthenticated && !userState.hasProfile && currentRoute === '/dashboard') {
    warnings.push('User missing profile data on dashboard');
    recommendations.push('Show progressive onboarding modal');
  }
  
  // Detect potential infinite redirects
  const applicableRules = navigationRules.filter(rule => {
    if (rule.from.includes('*')) {
      const basePath = rule.from.replace('*', '');
      return currentRoute.startsWith(basePath);
    }
    return rule.from === currentRoute;
  });
  
  const conflictingRules = applicableRules.filter(rule => rule.condition(userState));
  if (conflictingRules.length > 1) {
    warnings.push(`Multiple navigation rules apply from ${currentRoute}`);
    recommendations.push('Review rule priority and specificity');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations
  };
}

// Test all navigation scenarios
export function testNavigationScenarios(): void {
  logger.info('Testing navigation scenarios...');
  
  const scenarios: Array<{ name: string; userState: UserState; route: string }> = [
    {
      name: 'New unauthenticated user',
      userState: {
        isAuthenticated: false,
        hasCompletedOnboarding: false,
        hasProfile: false,
        hasActivePurchases: false,
        isNewUser: true,
        hasSessionExpired: false
      },
      route: '/dashboard'
    },
    {
      name: 'Authenticated user with incomplete onboarding',
      userState: {
        isAuthenticated: true,
        hasCompletedOnboarding: false,
        hasProfile: false,
        hasActivePurchases: false,
        isNewUser: true,
        hasSessionExpired: false
      },
      route: '/dashboard'
    },
    {
      name: 'Fully authenticated user',
      userState: {
        isAuthenticated: true,
        hasCompletedOnboarding: true,
        hasProfile: true,
        hasActivePurchases: true,
        isNewUser: false,
        hasSessionExpired: false
      },
      route: '/dashboard'
    },
    {
      name: 'User with expired session',
      userState: {
        isAuthenticated: false,
        hasCompletedOnboarding: true,
        hasProfile: true,
        hasActivePurchases: false,
        isNewUser: false,
        hasSessionExpired: true
      },
      route: '/dashboard'
    },
    {
      name: 'Authenticated user accessing onboarding after completion',
      userState: {
        isAuthenticated: true,
        hasCompletedOnboarding: true,
        hasProfile: true,
        hasActivePurchases: false,
        isNewUser: false,
        hasSessionExpired: false
      },
      route: '/onboarding'
    }
  ];
  
  scenarios.forEach(scenario => {
    const result = validateUserFlow(scenario.userState, scenario.route);
    logger.info(`Scenario: ${scenario.name}`, {
      route: scenario.route,
      isValid: result.isValid,
      errors: result.errors,
      warnings: result.warnings,
      recommendations: result.recommendations
    });
  });
  
  // Check for navigation loops
  const loops = detectNavigationLoops(navigationRules);
  if (loops.length > 0) {
    logger.warn('Navigation loops detected:', loops);
  } else {
    logger.info('No navigation loops detected');
  }
}

// Middleware function to validate navigation at runtime
export function validateNavigation(
  userState: UserState,
  fromRoute: string,
  toRoute: string
): { allowed: boolean; reason?: string } {
  const applicableRules = navigationRules.filter(rule => {
    if (rule.from.includes('*')) {
      const basePath = rule.from.replace('*', '');
      return fromRoute.startsWith(basePath);
    }
    return rule.from === fromRoute;
  });
  
  const validRule = applicableRules.find(rule => 
    rule.to === toRoute && rule.condition(userState)
  );
  
  if (validRule) {
    return { allowed: true };
  }
  
  const blockingRule = applicableRules.find(rule => 
    rule.to !== toRoute && rule.condition(userState)
  );
  
  if (blockingRule) {
    return { 
      allowed: false, 
      reason: `Navigation blocked: ${blockingRule.description}. Should go to ${blockingRule.to}` 
    };
  }
  
  return { allowed: true }; // No specific rule found, allow navigation
}