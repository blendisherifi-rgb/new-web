# **SoftCo Website Documentation**

## **1. Project Overview**

This repository powers the **SoftCo website frontend**.

It is a **Next.js App Router** project that renders **WordPress managed content** through **WPGraphQL** and selected **WordPress REST endpoints**.

The site uses an **ACF section based architecture**, where pages are built from flexible content layouts in WordPress and mapped to React section components in this codebase.

### **Architecture Overview**

1. **Frontend**: Next.js
2. **Backend CMS**: WordPress
3. Developers build reusable sections and modules in Next.js once
4. Content editors then build pages in WordPress by using those modules without touching code

This is the core model of the project.

## **2. Infrastructure and Deployment (Critical)**

### **2.1 Current Environment Setup**

1. **Dev**: local Next.js app connected to configured WordPress endpoints
2. **Prod**: Vercel frontend + SiteGround WordPress
3. **Stage**: currently not fully established, target is to set up staging and push to staging first before live after launch

### **2.2 Vercel Configuration**

1. Vercel is fully set up for deployments
2. Push to connected branch triggers deploy automatically in seconds
3. Vercel holds frontend environment variables per environment
4. Production rollback can be done by redeploying a previous good deployment

### **2.3 SiteGround Configuration**

1. WordPress is hosted on SiteGround Geek plan
2. Migration and backup flow has been done with **All in One WP Migration**
3. SiteGround backups are available and fast to restore
4. WordPress endpoints must remain reachable by frontend

### **2.4 Networking Requirements (What talks to what)**

1. Browser talks to Next.js frontend
2. Next.js server talks to WordPress GraphQL endpoint
3. Next.js server talks to WordPress REST endpoint
4. WordPress publish flow talks to frontend revalidation endpoint

### **2.5 Why Initial AWS Setup Had Issues**

Primary problem was **instance to instance communication** and environment configuration, not frontend code.

In plain terms:

1. Frontend instance could not reliably fetch data from WordPress instance
2. Networking or host level config blocked expected traffic
3. Configuration ownership was unclear

## **3. CI CD and Release Process**

### **3.1 Pipeline**

1. Developer pushes code to GitHub
2. Vercel automatically builds and deploys
3. Deploy usually completes in seconds

### **3.2 Release Steps**

1. Merge approved change
2. Confirm Vercel deployment success
3. Smoke test homepage, inner page, and one locale route
4. Confirm WordPress data is rendering
5. Confirm revalidation works

### **3.3 Rollback Strategy**

If production breaks:

1. Rollback frontend to previous stable deployment in Vercel
2. Restore WordPress from SiteGround backup if CMS side broke
3. Re run revalidation after rollback
4. Log cause and owner

This gives a fast path to recovery.

## **4. Environment Setup (Step by Step)**

### **4.1 Local Setup from Scratch**

1. Clone repository
2. Run `npm ci`
3. Create `.env.local`
4. Add required environment variables
5. Run `npm run dev`
6. Open `http://localhost:3000`

### **4.2 Required Env Variables**

1. `WORDPRESS_GRAPHQL_URL`
2. `WORDPRESS_REST_URL`
3. `REVALIDATION_SECRET`
4. `NEXT_PUBLIC_SITE_URL`
5. `ACF_SECTIONS_PATH`
6. `ACF_LAYOUT_TYPE_PREFIX`
7. `ACF_LAYOUT_SUFFIX`
8. `HIREHIVE_CAREERS_ORIGIN` optional

### **4.3 .env Example**

`WORDPRESS_GRAPHQL_URL=https://your-wordpress-domain/graphql`

`WORDPRESS_REST_URL=https://your-wordpress-domain/wp-json`

`REVALIDATION_SECRET=replace-with-secure-secret`

`NEXT_PUBLIC_SITE_URL=https://softco.com`

`ACF_SECTIONS_PATH=pageContentSections.sections`

`ACF_LAYOUT_TYPE_PREFIX=PageContentSectionsSections`

`ACF_LAYOUT_SUFFIX=Layout`

### **4.4 Deploying a New Environment**

1. Create frontend runtime
2. Create WordPress runtime
3. Configure DNS and SSL
4. Configure env vars
5. Validate frontend can fetch from backend
6. Validate revalidation endpoint

## **5. Ownership and Boundaries**

### **5.1 CloudOps Owns**

1. Infrastructure
2. Instance creation
3. Networking and connectivity between instances
4. DNS and SSL
5. Monitoring at infrastructure level
6. Stage environment setup

### **5.2 Developers Own**

1. Next.js code and data mapping
2. WordPress integration logic
3. Required env variable contract
4. API behavior and content rendering checks
5. Application level release validation

### **5.3 Where Config Should Live**

1. App config in code and environment variables
2. Infrastructure config in CloudOps managed platform config
3. No unmanaged ad hoc server config changes

### **5.4 What Should Never Be Changed at Server Level Without Joint Approval**

1. Apache or web server routing rules
2. Reverse proxy behavior
3. SSL termination path
4. Port mapping between frontend and backend
5. Security rules affecting frontend to backend communication

This is mandatory to avoid repeat of previous Apache and connectivity problems.

## **6. WordPress Setup (Deep)**

### **6.1 Critical Plugins**

1. Yoast SEO
2. Advanced Custom Fields Pro
3. WPGraphQL
4. WPGraphQL for ACF
5. Redirection

The headless approach intentionally keeps plugin count low.

### **6.2 Theme and PHP Dependencies**

1. Theme must support current content model and custom post types used by frontend
2. Custom PHP dependencies in repo must stay aligned with frontend contracts
3. Team member related PHP files are part of that dependency chain

### **6.3 WPGraphQL Setup Steps**

1. Install and activate WPGraphQL
2. Install and activate WPGraphQL for ACF
3. Confirm GraphQL endpoint responds
4. Confirm ACF fields are exposed in schema
5. Confirm GraphQL type names match frontend query expectations

### **6.4 ACF Import Steps**

1. Open WordPress admin
2. Go to Custom Fields tools
3. Import `acf-export-softco-sections-UPDATED.json`
4. Confirm group is active for pages
5. If old field groups conflict, remove old group and import cleanly
6. Retest rendering from frontend

## **7. Failure and Risk Scenarios**

### **7.1 If WordPress Goes Down**

1. New content fetch fails
2. Dynamic sections may fail for uncached pages
3. Some pages may still show cached output temporarily

### **7.2 If GraphQL Fails**

1. Pages can show missing modules or incomplete content
2. Debug endpoints and logs must be checked immediately
3. Revalidation will not fix schema errors by itself

### **7.3 Known Fragile Areas**

1. Frontend to backend communication path
2. Environment variable mismatches
3. ACF layout and GraphQL schema drift
4. Unreviewed server level config changes

## **8. Migration Plan (SiteGround to AWS)**

### **8.1 Why SiteGround Works Now**

1. Setup is stable and known
2. WordPress and frontend integration is already proven
3. Backups and restore flow are straightforward

### **8.2 What Needs to Change for AWS**

1. Build two correctly configured runtimes that can communicate
2. Ensure frontend can fetch GraphQL and REST from backend
3. Ensure security groups and routing allow required traffic
4. Ensure DNS, SSL, and env vars are correct
5. Ensure CloudOps monitoring and ownership are active

### **8.3 Is Architecture Portable**

Yes. The architecture is portable if environment contract and connectivity are implemented correctly.

### **8.4 Risks in Moving Later**

1. Communication break between instances
2. DNS and SSL misconfiguration
3. Wrong environment values
4. Schema differences if WordPress stack changes

### **8.5 Practical Decision**

If AWS communication and stability are fixed by CloudOps, we continue with same application model and deploy flow.

Developer side expectation is simple:

1. two healthy runtimes
2. reliable communication between them
3. stable environment configuration

Then application delivery continues as normal.

## **9. Hosting and Platform Costs**

1. SiteGround WordPress hosting: 49.99 USD per month
2. Vercel frontend deployment: 20 USD per month
3. GitHub for source control and collaboration

## **10. Why We Use GraphQL**

WPGraphQL provides structured, predictable content from WordPress and fits the module based architecture.

Flow:

1. WordPress sends section types
2. Next.js maps each type to component
3. Frontend renders dynamically

Benefits:

1. cleaner data contracts
2. fewer custom endpoints
3. faster debugging

WordPress REST is still used for specific operational paths such as redirects.

## **11. Module System**

1. Developers create React section components
2. Matching ACF layouts are configured in WordPress
3. Editors add or reorder modules in WordPress
4. Frontend renders modules dynamically

This is how non technical teams safely manage content.

## **12. Routing and Internationalization**

Supported locales:

1. `us`
2. `ie`
3. `uk`

Behavior:

1. locale routes under `src/app/[locale]`
2. middleware handles default locale
3. middleware applies redirects
4. locale mapping in `src/lib/i18n.ts`

## **13. Main API Endpoints**

1. `/api/revalidate`
2. `/api/search`
3. `/api/resources/latest`
4. `/api/hirehive/jobs`
5. `/api/debug/page`
6. `/api/debug/translations`
7. `/api/debug/schema-types`
8. `/api/debug/homepage-static`
9. `/api/debug/case-studies`

`/api/revalidate` is protected with `x-revalidation-secret`.

## **14. Final Notes**

This project is designed so developers control quality through reusable modules, while non developers manage content safely in WordPress.

Clear ownership and stable infrastructure are the key to avoiding repeat production issues.
