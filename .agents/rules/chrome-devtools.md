# Chrome DevTools Guidelines for Agents

When debugging, verifying UI changes, or testing web application behavior in this project, leverage Chrome DevTools via MCP:

## Connection & Target Selection
1. **Find Active Tabs**: Call `list_pages` to discover open tabs and retrieve their `pageId`.
2. **Targeting**: Pass `pageId` directly to interaction tools or use `select_page` to focus the intended tab.

## Debugging Workflows
1. **Console & Runtime Diagnostics**:
   - Call `list_console_messages` to check for runtime errors, warnings, or unhandled promise rejections after modifying frontend code.
   - Use `get_console_message` to retrieve full error stack traces.
2. **Network Inspection**:
   - Call `list_network_requests` when diagnosing API issues, 4xx/5xx responses, or CORS errors.
   - Call `get_network_request` with the request ID to inspect payloads and status codes.
3. **Visual Verification**:
   - Use `take_screenshot` to confirm visual layout, responsive styles, and CSS fixes.
   - Use `take_snapshot` to inspect accessibility tree and DOM structure.
4. **Interactive Verification**:
   - Use `click`, `fill`, `hover`, or `navigate_page` to verify interactive flows.
5. **Performance Auditing**:
   - Use `lighthouse_audit` to check Core Web Vitals, accessibility, and SEO.
   - Use `performance_start_trace` and `performance_stop_trace` to diagnose long tasks or rendering bottlenecks.

## Safety & Protocol
- Do not inspect or log sensitive credentials or private cookies.
- Maintain isolated, non-destructive interactions.
