# CE.md - Context Engineering Guide

This document provides comprehensive context engineering best practices for AI assistants working with the MoveGlobe codebase. It demonstrates how to structure context for optimal AI comprehension and task execution.

## <project_context>

### <business_domain>
MoveGlobe is an AI business consultancy platform that helps organizations achieve financial and operational goals through:
- **Core Value Proposition**: AI agents and automation solutions for business transformation
- **Target Audience**: Mid to large enterprises seeking digital transformation
- **Key Differentiators**: Interactive 3D visualization, multilingual support (EN/NL), white-glove consultancy approach
- **Business Model**: B2B SaaS with consultancy services
</business_domain>

### <technical_constraints>
- **Performance**: 3D globe must maintain 60fps on mobile devices
- **Accessibility**: WCAG 2.1 AA compliance required
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Bundle Size**: Client bundle must stay under 500KB gzipped (excluding 3D assets)
- **API Response Time**: 95th percentile under 200ms
- **Database**: PostgreSQL 14+ with row-level security
</technical_constraints>

### <user_personas>
1. **Enterprise Decision Maker**: C-suite executives evaluating AI transformation
   - Needs: ROI clarity, risk assessment, competitive advantage insights
   - Pain points: AI implementation complexity, change management
   
2. **Technical Evaluator**: IT directors and architects
   - Needs: Integration capabilities, security compliance, scalability proof
   - Pain points: Legacy system compatibility, data governance
   
3. **End User**: Business analysts and operators
   - Needs: Intuitive interface, clear workflows, measurable outcomes
   - Pain points: Learning curve, process disruption
</user_personas>

</project_context>

## <development_context>

### <coding_standards>
```xml
<rules>
  <rule priority="critical">Use TypeScript strict mode - no implicit any</rule>
  <rule priority="critical">All user inputs must be validated with Zod schemas</rule>
  <rule priority="high">React components must use function syntax with TypeScript interfaces</rule>
  <rule priority="high">Database queries must use parameterized statements via Drizzle ORM</rule>
  <rule priority="medium">CSS-in-JS via Tailwind classes only - no inline styles</rule>
  <rule priority="medium">File names: kebab-case for files, PascalCase for components</rule>
</rules>
```
</coding_standards>

### <architectural_patterns>
1. **Frontend Architecture**
   ```typescript
   // Component Structure Pattern
   interface ComponentProps {
     // Props interface defined first
   }
   
   export function ComponentName({ prop1, prop2 }: ComponentProps) {
     // Hooks at the top
     // Event handlers
     // Render logic
   }
   ```

2. **API Route Pattern**
   ```typescript
   // server/routes/resource.ts
   export function createResourceRoutes(app: Express, storage: IStorage) {
     app.post('/api/resource', validateRequest(schema), async (req, res) => {
       try {
         const result = await storage.createResource(req.body);
         res.json({ success: true, data: result });
       } catch (error) {
         res.status(500).json({ success: false, error: error.message });
       }
     });
   }
   ```

3. **State Management Pattern**
   ```typescript
   // Zustand store pattern
   interface StoreState {
     // State shape
     // Actions
   }
   
   export const useStore = create<StoreState>((set) => ({
     // Initial state
     // Action implementations
   }));
   ```
</architectural_patterns>

### <decision_records>
- **ADR-001**: Chose PostgreSQL over MongoDB for strong consistency and relational data integrity
- **ADR-002**: Selected Three.js over Babylon.js for better React integration and smaller bundle size
- **ADR-003**: Implemented server-side form validation to ensure data integrity regardless of client
- **ADR-004**: Using Zustand over Redux for simpler state management with less boilerplate
- **ADR-005**: Adopted Drizzle ORM over Prisma for better TypeScript inference and smaller runtime
</decision_records>

</development_context>

## <operational_context>

### <deployment_specifics>
```yaml
platform: Dokku on Hetzner Cloud
region: EU (Germany)
deployment_method: Git push to Dokku remote
build_process: Docker multi-stage build
runtime: Node.js 18 Alpine
monitoring: Health checks on /api/health
ssl: Let's Encrypt auto-renewal
backup: Daily PostgreSQL dumps to S3
```
</deployment_specifics>

### <environment_variables>
```xml
<required>
  <var name="DATABASE_URL" format="postgresql://..." security="high">
    PostgreSQL connection string with SSL mode require
  </var>
  <var name="SESSION_SECRET" format="random-256-bit" security="critical">
    Used for session encryption - must be cryptographically secure
  </var>
</required>
<optional>
  <var name="PORT" default="5000" security="low">
    Server port binding
  </var>
  <var name="ADMIN_PASSWORD" format="bcrypt-hash" security="high">
    Admin panel access - should be hashed before storage
  </var>
</optional>
```
</environment_variables>

### <monitoring_alerts>
1. **Performance Alerts**
   - API response time > 500ms (warning)
   - API response time > 1000ms (critical)
   - Database query time > 100ms (warning)

2. **Error Rate Alerts**
   - 5xx errors > 1% of requests (warning)
   - 5xx errors > 5% of requests (critical)
   - Form submission failures > 10% (critical)

3. **Resource Alerts**
   - Memory usage > 80% (warning)
   - Disk usage > 90% (critical)
   - Database connections > 80% of pool (warning)
</monitoring_alerts>

</operational_context>

## <ai_assistant_context>

### <task_instructions>
When working on this codebase, AI assistants should:

1. **Before Making Changes**
   ```xml
   <checklist>
     <item>Check existing patterns in similar files</item>
     <item>Verify TypeScript types compile</item>
     <item>Ensure changes align with architectural patterns</item>
     <item>Consider impact on bundle size for client code</item>
   </checklist>
   ```

2. **Code Generation Rules**
   ```xml
   <rules>
     <rule>Always use existing UI components from @/components/ui</rule>
     <rule>Implement proper error boundaries for React components</rule>
     <rule>Add loading states for all async operations</rule>
     <rule>Include aria-labels for accessibility</rule>
     <rule>Use semantic HTML elements</rule>
   </rules>
   ```

3. **Testing Approach**
   ```xml
   <testing>
     <unit>Test pure functions and utilities</unit>
     <integration>Test API endpoints with different storage backends</integration>
     <e2e>Test critical user journeys (form submission, language switching)</e2e>
     <performance>Ensure 3D scene renders under 16ms</performance>
   </testing>
   ```
</task_instructions>

### <common_tasks>
1. **Adding a New API Endpoint**
   ```xml
   <steps>
     <step>Define Zod schema in shared/schemas/</step>
     <step>Create route handler in server/routes/</step>
     <step>Add to route registration in server/index.ts</step>
     <step>Create TypeScript types from schema</step>
     <step>Add client-side API function in client/src/lib/api/</step>
     <step>Update API documentation</step>
   </steps>
   ```

2. **Creating a New Component**
   ```xml
   <steps>
     <step>Check if similar component exists in @/components/ui</step>
     <step>Create component file with TypeScript interface</step>
     <step>Implement responsive design with Tailwind</step>
     <step>Add motion with Framer Motion if interactive</step>
     <step>Include in component index if reusable</step>
     <step>Add Storybook story if UI component</step>
   </steps>
   ```

3. **Database Schema Changes**
   ```xml
   <steps>
     <step>Update schema in server/db/schema.ts</step>
     <step>Run npm run db:push to apply changes</step>
     <step>Update related TypeScript interfaces</step>
     <step>Modify storage implementations if needed</step>
     <step>Test with both storage backends</step>
     <step>Update seed data if applicable</step>
   </steps>
   ```
</common_tasks>

### <edge_cases>
```xml
<scenarios>
  <scenario name="3D Loading Failure">
    <description>Globe model fails to load</description>
    <handling>Show 2D world map fallback with loading error message</handling>
  </scenario>
  
  <scenario name="Database Connection Loss">
    <description>PostgreSQL becomes unavailable</description>
    <handling>Gracefully fallback to in-memory storage with user warning</handling>
  </scenario>
  
  <scenario name="Form Spam">
    <description>Rapid form submissions from same IP</description>
    <handling>Rate limit to 5 submissions per minute per IP</handling>
  </scenario>
  
  <scenario name="Language Detection">
    <description>User's browser language not EN or NL</description>
    <handling>Default to English with language selector prominently displayed</handling>
  </scenario>
</scenarios>
```
</edge_cases>

### <performance_optimizations>
```xml
<optimizations>
  <frontend>
    <optimization name="Code Splitting">
      <apply-when>Adding new routes or heavy components</apply-when>
      <technique>Use React.lazy() and Suspense</technique>
    </optimization>
    <optimization name="3D Asset Optimization">
      <apply-when>Globe performance under 60fps</apply-when>
      <technique>Reduce polygon count, use LOD, compress textures</technique>
    </optimization>
  </frontend>
  
  <backend>
    <optimization name="Query Optimization">
      <apply-when>Database queries over 50ms</apply-when>
      <technique>Add indexes, use query explain, consider caching</technique>
    </optimization>
    <optimization name="Response Caching">
      <apply-when>Identical requests within 5 minutes</apply-when>
      <technique>Implement Redis caching layer</technique>
    </optimization>
  </backend>
</optimizations>
```
</performance_optimizations>

</ai_assistant_context>

## <integration_with_claude_md>
This CE.md file complements CLAUDE.md by providing:
- **Deeper Context**: Business and operational context beyond technical setup
- **Decision Rationale**: Why certain technologies and patterns were chosen
- **Task Workflows**: Step-by-step guides for common development tasks
- **Edge Case Handling**: Specific scenarios and their solutions

When both files are present, AI assistants should:
1. Use CLAUDE.md for technical setup and architecture overview
2. Reference CE.md for context, patterns, and decision-making
3. Follow the task workflows in CE.md when implementing features
</integration_with_claude_md>

## <context_usage_examples>

### Example 1: API Endpoint Addition
```xml
<query>Add an endpoint to track user engagement metrics</query>
<context_used>
  <from_ce>API Route Pattern, Zod validation requirement, storage abstraction</from_ce>
  <from_claude>API route structure, existing endpoints, storage interface</from_claude>
  <action>Create schema, implement route with both storage backends, add client function</action>
</context_used>
```

### Example 2: Performance Issue
```xml
<query>The globe is rendering slowly on mobile</query>
<context_used>
  <from_ce>Performance constraints (60fps), optimization techniques, mobile scaling</from_ce>
  <from_claude>3D implementation details, responsive scaling values</from_claude>
  <action>Check polygon count, implement LOD, verify mobile scaling is active</action>
</context_used>
```

### Example 3: New Feature Request
```xml
<query>Add a dashboard for analytics</query>
<context_used>
  <from_ce>User personas, component patterns, performance budgets</from_ce>
  <from_claude>Existing components, routing setup, state management</from_claude>
  <action>Design for decision makers, use existing UI components, implement with code splitting</action>
</context_used>
```

## <maintenance_notes>
This context file should be updated when:
- Major architectural decisions are made
- New patterns are established
- Performance benchmarks change
- Deployment infrastructure changes
- Common issues arise that need documentation

Last updated: 2025-01-25
Next review: 2025-02-25