# Analytics Implementation Plan for MoveGlobe

## Overview
This document outlines the analytics strategy for capturing visitor interactions and metrics in the MoveGlobe application.

## Recommended Approach: Hybrid Solution
Combine **Plausible Analytics** for basic metrics with a **custom PostgreSQL solution** for detailed interaction tracking.

## Key Metrics to Track

### 1. Page Views & Navigation
- Page visits (/, /vsl, /application, /hto, /lto, etc.)
- Navigation flow between pages
- Time spent on each page
- Bounce rates

### 2. 3D Globe Interactions
- Globe rotation/interaction events
- Touch vs mouse interactions
- Device type (mobile/tablet/desktop)

### 3. Form Submissions
- Form starts vs completions
- Field abandonment rates
- Submission success/error rates
- Time to complete forms

### 4. User Journey
- VSL → Application → HTO/LTO funnel conversion
- Language preferences (EN/NL)
- Device and browser information

## Analytics Solutions Comparison

### 1. **PostHog** (Best for Product Analytics)
- Open-source, self-hostable option
- Session recording & heatmaps
- Feature flags & A/B testing
- Event-based tracking
- GDPR compliant

### 2. **Plausible Analytics** (Privacy-Focused)
- Lightweight (< 1KB script)
- No cookies, GDPR compliant
- Simple integration
- Real-time dashboard
- Good for basic metrics

### 3. **Mixpanel** (Advanced Product Analytics)
- Detailed user journey tracking
- Cohort analysis
- Retention analytics
- Custom event properties

### 4. **Custom Solution with PostgreSQL**
- Leverage existing database
- Full control over data
- Create custom analytics tables
- Build own dashboard

## Implementation Steps

### 1. Set up Plausible Analytics
- Add Plausible script to index.html
- Configure custom events for key actions
- Track page views, sessions, and basic metrics

### 2. Create Custom Analytics Tables
```sql
-- Analytics events table
CREATE TABLE analytics_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  event_category VARCHAR(100),
  event_action VARCHAR(255),
  event_label VARCHAR(255),
  event_value NUMERIC,
  user_id VARCHAR(255),
  session_id VARCHAR(255),
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Page views table
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(255) NOT NULL,
  page_title VARCHAR(255),
  user_id VARCHAR(255),
  session_id VARCHAR(255),
  time_on_page INTEGER,
  bounce BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions table
CREATE TABLE user_sessions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_id VARCHAR(255),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP,
  page_count INTEGER DEFAULT 0,
  total_duration INTEGER,
  device_type VARCHAR(50),
  browser VARCHAR(100),
  language VARCHAR(10)
);

-- Interaction metrics table
CREATE TABLE interaction_metrics (
  id SERIAL PRIMARY KEY,
  interaction_type VARCHAR(100) NOT NULL,
  component_name VARCHAR(100),
  interaction_data JSONB,
  user_id VARCHAR(255),
  session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Implement Event Tracking System
- Create analytics context provider
- Add useAnalytics hook for easy event tracking
- Implement automatic page view tracking in router
- Add event tracking to key components

### 4. Track Key Interactions
- Form field interactions (focus, blur, completion time)
- Globe interactions (rotation, clicks, zoom)
- Button clicks and CTA engagement
- Video/VSL engagement metrics
- Language switching events

### 5. Create Analytics API Endpoints
- POST `/api/analytics/event` - Track custom events
- POST `/api/analytics/pageview` - Track page views
- GET `/api/analytics/dashboard` - Analytics data for admin

### 6. Build Analytics Dashboard
- Add to admin panel at `/admin/analytics`
- Show key metrics, conversion funnels, user journeys
- Real-time visitor count
- Form conversion rates

### 7. Privacy Compliance
- Add analytics consent banner
- Update privacy policy
- Implement data retention policies
- Ensure GDPR compliance

## Implementation Priority
1. **Phase 1**: Basic page tracking with Plausible
2. **Phase 2**: Custom event tracking for forms and CTAs
3. **Phase 3**: 3D globe interaction tracking
4. **Phase 4**: Analytics dashboard in admin panel
5. **Phase 5**: Advanced metrics and A/B testing

## Privacy Considerations
- Use anonymized user IDs (no PII)
- Implement IP anonymization
- Add cookie consent banner
- Provide data export/deletion options
- Document data usage in privacy policy

## Performance Considerations
- Batch analytics events to reduce API calls
- Use Web Workers for heavy analytics processing
- Implement client-side event queue
- Add rate limiting to analytics endpoints
- Consider using a time-series database for better performance at scale