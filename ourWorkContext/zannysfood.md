1. What Is This Business?
Zannys Food (Zannys Food Ltd.) is a UK-based online food platform that connects people who want home-cooked or freshly prepared meals with independent chefs, caterers, and food vendors in their area.

Think of it as a marketplace — not a single restaurant, but a network of vetted food sellers. Customers browse menus, place orders, and either pick up food or have it delivered. Chefs run their own kitchens from home or small businesses. Drivers handle deliveries. The company behind the platform (Zannys Food) runs the apps, website, payments, and quality checks.

The platform solves a few problems at once:

For customers: Finding trustworthy, local, home-style or specialty food beyond big chain delivery apps — with allergy info, dietary preferences, and the option to order for everyday meals or larger events.
For chefs and caterers: A sales channel with built-in ordering, payments, and visibility — without building their own tech stack.
For the business: A multi-sided marketplace where the platform earns from service fees, delivery charges, and the flow of payments between customers, chefs, and drivers.
The space it operates in sits between everyday food delivery (like Deliveroo) and catering/event food services. It emphasises vetted, compliant food sellers (hygiene certificates, licenses, admin approval) and personal, chef-driven food rather than anonymous restaurant chains.

2. The User's Perspective
Discovering the platform
A customer typically finds Zannys Food through the mobile app, website, or marketing content (blogs, FAQs, customer testimonials). The home experience shows food categories, promotional banners, featured dishes, and a selection of active chefs nearby.

Signing up
Customers create an account with email and password (verified by a one-time code sent to their email), or sign in with social login / Apple Sign-In without a traditional password. They can add a profile photo, phone number, and allergy information.

Browsing and choosing food
Using their location, customers see approved chefs who are online and available. Chefs are grouped by type (e.g. cuisine or business category). Each chef has a profile, menu items with photos, descriptions, prices, allergy tags, and nutrition details. Customers can:

Save favourite dishes or restaurants
Subscribe to chefs to stay in the loop (likely for updates or promotions)
Read reviews left by other customers
Placing an order (everyday meals)
The typical flow:

Browse a chef’s menu and add items to a cart
Choose pickup or delivery
Add a delivery address (saved for next time) or confirm pickup timing
Optionally add a note for the chef, a tip, and a promo code
Pay by card, Google Pay, or cash on delivery
Receive a confirmation and track the order via push notifications
Pickup journey: The chef accepts the order → prepares it → marks it ready → the customer collects it.

Delivery journey: The chef prepares the order → marks it complete → nearby approved drivers are alerted → a driver picks it up → delivers to the customer. The customer gets updates at each stage (accepted, ready, rider en route, collected, delivered).

After delivery or pickup, the customer can leave a rating and written review for the chef.

Private / custom orders
For more bespoke needs (e.g. a custom menu or specific dates), customers can place a private order. Payment is taken upfront by card, and the customer can specify selected dates. This is a higher-touch, made-to-order path rather than a standard menu checkout.

Event catering enquiries
For weddings, corporate events, parties, and similar occasions, customers fill out a detailed event catering form rather than checking out instantly. They provide:

Event type, date, number of guests, and budget
Preferred cuisines and serving style (buffet, plated, etc.)
Delivery location and timing
Whether disposable plates are needed
Contact preferences and any special requirements
The platform acknowledges the enquiry by email. An admin later sends a confirmation email when the booking is confirmed — suggesting a quote-and-confirm process rather than instant online booking for large events.

Getting value
Value for the customer is: convenient access to local, vetted chefs; safe ordering with allergy awareness; flexible pickup or delivery; discounts via promo codes; and options from a quick lunch to a full event catering enquiry.

3. The Business Owner's Perspective
The company running Zannys Food acts as the platform operator. Based on the codebase, they control and oversee:

Marketplace operations
Approving or rejecting chefs before they can sell — reviewing licenses, safety certificates, food hygiene documents, and bank details
Approving or rejecting drivers before they can deliver
Curating “Top Chefs” — featured listings on the platform
Viewing platform-wide stats: total orders, merchants, and customers
Money and pricing
Platform service charge — a configurable percentage/fee added to orders
Delivery pricing — per-kilometre delivery rates (though the live fee shown to customers may currently be a fixed amount; see ambiguity note below)
Promo codes — create discount codes with expiry dates, optional user targeting, and one-time-use tracking
Payouts to chefs and drivers — the platform collects customer payments via Stripe, then transfers earnings to chefs and drivers through Stripe Connect (often batched by week/order group)
Tips — customers can add tips on orders; these flow through the order/payment system
There is no subscription model for customers or chefs in the codebase — revenue appears to come from transaction-based fees (service charges, delivery fees) and the marketplace payment flow.

Content and brand
Blogs (title, subtitle, image, description, publish status)
FAQs
Website testimonials (customer name, meal ordered, photo, feedback)
Privacy policy text
App version settings (forcing updates on customer and merchant apps when needed)
A link to external food safety certification resources
Catalog and safety standards
Global food categories and portion-size groupings
Allergen categories and individual allergens (used on menus and customer profiles)
Support ticket management from merchants
Event catering pipeline
View all event enquiry forms
Send “we received your enquiry” and “your order is confirmed” emails to customers
Configuration
Per-kilometre delivery charge rates
Service charge percentage
Certification links for merchant onboarding
Business model in plain terms: Zannys Food is a marketplace middleman. Customers pay the platform; the platform pays chefs and drivers after taking its cut (service fees, and implicitly whatever margin exists in delivery fees). Chef and driver onboarding is gated by approval, which protects brand trust and regulatory compliance in the UK food space.

4. Roles in the System
Customer (end user)
Create and manage a personal account
Save delivery addresses and dietary/allergy preferences
Browse chefs and menus near their location
Place standard orders (pickup or delivery), private orders, or event catering enquiries
Save payment cards securely via Stripe
Apply promo codes
Favourite dishes and chefs; subscribe to chefs
Track orders via push notifications
Leave reviews and ratings after orders
Contact the platform via a “get in touch” form
Pay by card, Google Pay, or cash on delivery
Merchant / Chef / Food vendor
Register with business details, photos, compliance documents (license, safety certificate, food hygiene cert), and bank details
Wait for admin approval before fully operating
After approval, receive login credentials by email and access the merchant app
Build and manage their menu (dishes, prices, images, allergies, nutrition)
Create promotional banners tied to products
Set whether they offer pickup and/or delivery, along with timing preferences
Toggle online/offline availability
Receive new order alerts via push notification
Accept, reject, or progress orders through preparation
View a dashboard: pickup vs delivery order counts, earnings, product count, charts over date ranges
Connect a Stripe account to receive payouts
View payment history
Submit support messages to the platform
Accumulate customer reviews on their profile
Note: Merchants appear to include home cooks, caterers, and similar vendors — registration captures business type, food type, services offered, and catering capacity.

Driver (delivery partner)
Register with personal details, photo, and driving license
Wait for admin approval
Connect a Stripe account to receive delivery fee payouts
See available delivery jobs near their location (when orders are ready for pickup from chefs)
Accept and fulfil deliveries, updating status as they pick up and deliver
View payment history for completed delivery earnings
Update their live location while working
Platform administrator
Log in to an admin panel
Approve or reject merchants and drivers
Mark merchants as “Top Chef”
View all merchants, customers, drivers, and orders
Manage promo codes
Set platform service charges, delivery rates, app versions, and privacy policy
Manage food categories, portion sections, and allergen data
Publish blogs and FAQs
Manage website testimonials
Handle merchant support tickets
Process event catering enquiries and send confirmation emails
Trigger or record payouts to merchants and drivers
View high-level dashboard counts
There is no separate “restaurant manager” or “support agent” role — support and operations appear to fall under the single admin role.

5. Core Features of the Platform
Discover local chefs near you
Browse vetted food sellers based on your location, grouped by cuisine or business type.

Home-cooked and catering menus
View detailed menus with photos, descriptions, prices, allergen warnings, and nutrition information.

Order for pickup or delivery
Choose how you want your food — collect from the chef or have a driver bring it to you.

Real-time order tracking
Get push notifications as your order is accepted, prepared, picked up, and delivered.

Secure card and mobile payments
Pay by saved card, Google Pay, or cash on delivery — all in British pounds.

Promo codes and discounts
Apply admin-created discount codes at checkout, including one-time offers.

Save favourites
Bookmark dishes and restaurants for quick re-ordering.

Follow your favourite chefs
Subscribe to chefs to stay connected (e.g. for updates or new menu items).

Allergy-aware ordering
Set personal allergy preferences and see allergen info on every dish.

Saved addresses
Store multiple delivery addresses with labels for faster checkout.

Private and custom orders
Place bespoke orders with upfront payment and chosen dates — ideal for special requests.

Event catering enquiries
Submit detailed forms for weddings, corporate events, and parties; receive email follow-up from the Zannys Food team.

Chef reviews and ratings
Share feedback after your meal to help other customers choose.

Vetted chef marketplace
Every seller goes through document checks and admin approval — food hygiene certificates, licenses, and safety documentation.

Chef business tools
Merchants get a dashboard, menu management, promotional banners, order alerts, and earnings tracking.

Driver delivery network
Location-based matching connects available drivers with nearby ready orders.

Featured “Top Chefs”
Admin-curated highlights showcase standout sellers on the platform.

Content hub
Blogs, FAQs, and customer testimonials support marketing and customer education.

Multi-app ecosystem
Separate experiences for customers, merchants (chef app on iOS and Android), and drivers — all powered by one backend.

6. Technical Overview (Brief)
Area	Detail
Stack
Node.js with Express; MongoDB (Atlas) via Mongoose
Architecture
Monolithic REST API — business logic lives mainly in route handlers, with one small Stripe card controller
Deployment
Heroku (Procfile)
Payments
Stripe — customer charges (PaymentIntents, GBP), Google Pay, Stripe Connect Express for merchant/driver payouts
Notifications
Firebase Cloud Messaging (FCM) for mobile push alerts
Email
Gmail via Nodemailer; HTML templates rendered with EJS
Auth
JWT tokens; bcrypt password hashing; email OTP for registration/password reset; Apple Sign-In and social login for customers
Clients
Customer app (zanny-app-10dfa Firebase project), merchant app (com.zanny_merchant), implied driver and admin frontends
Other
Cloudinary for email branding assets; location-based distance calculations for merchant/driver matching
Ambiguities and inferences flagged
Geographic radius — Distance logic exists (roughly 5–17 km for merchants and drivers), but some radius filters appear disabled in the live code, so “nearby” may currently show more chefs than strictly intended.
Delivery fee — A per-kilometre rate is configurable by admin, but the fee returned to customers may be a fixed £2.50 regardless of distance.
Commission structure — No automatic commission split is calculated in code; merchant and driver payouts seem manually triggered by admin in batches rather than auto-deducted per order.
Merchant “type” — Used to group chefs on the customer app; exact category values are set at registration, not hard-coded in the backend.
Event catering pricing — Enquiry forms capture budget and details, but pricing and final payment for events appear to happen offline or manually after admin confirmation.
Subscriptions — “Subscribe to chef” means joining a notification/follow list, not a paid subscription.
Currency inconsistency — Most customer-facing payments use GBP, but some internal Stripe transfer code references USD — likely a legacy or configuration issue rather than intentional multi-currency support.
This document reflects what the Zanny Backend codebase implements and implies about the Zannys Food business. It describes the product as it is built today, not necessarily the full commercial vision or every detail visible only in mobile app frontends.