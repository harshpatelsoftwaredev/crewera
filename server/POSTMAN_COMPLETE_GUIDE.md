# CREWERA REALITY â€” Complete API Testing Guide

> **Base URL:** `http://localhost:5555/api`  
> **Database:** `crewera_reality_v2`  
> For authenticated routes, add Header: `Authorization: Bearer <token>`

---

# MODULE 1: AUTHENTICATION

## REGISTER
```
POST : http://localhost:5555/api/auth/register
```
input:
```json
{
    "email": "2084harsh@gmail.com",
    "password": "aaBC@$12",
    "first_name": "Harsh",
    "last_name": "Patel",
    "phone": "7567586809"
}
```
output:
```json
{
    "success": true,
    "message": "Registration successful. Please verify your email.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 11,
        "first_name": "Harsh",
        "last_name": "Patel",
        "email": "2084harsh@gmail.com",
        "role": "user"
    }
}
```

---

## LOGIN
```
POST : http://localhost:5555/api/auth/login
```
input:
```json
{
    "email": "2084harsh@gmail.com",
    "password": "aaBC@$12"
}
```
output:
```json
{
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 11,
        "first_name": "Harsh",
        "last_name": "Patel",
        "email": "2084harsh@gmail.com",
        "role": "user",
        "email_verified": 0
    }
}
```

---

## LOGOUT
```
POST : http://localhost:5555/api/auth/logout
Authorization: Bearer <token>
```
input: none
output:
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

---

## REFRESH TOKEN
```
POST : http://localhost:5555/api/auth/refresh-token
```
input:
```json
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
output:
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## FORGOT PASSWORD
```
POST : http://localhost:5555/api/auth/forgot-password
```
input:
```json
{
    "email": "2084harsh@gmail.com"
}
```
output:
```json
{
    "success": true,
    "message": "Password reset link sent to your email",
    "resetToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## RESET PASSWORD
```
POST : http://localhost:5555/api/auth/reset-password
```
input:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "password": "newPass@123"
}
```
output:
```json
{
    "success": true,
    "message": "Password reset successfully"
}
```

---

## VERIFY EMAIL
```
GET : http://localhost:5555/api/auth/verify-email?token=abc123xyz
```
input: query param `token`
output:
```json
{
    "success": true,
    "message": "Email verified successfully"
}
```

---

## RESEND VERIFICATION
```
POST : http://localhost:5555/api/auth/resend-verification
Authorization: Bearer <token>
```
input: none
output:
```json
{
    "success": true,
    "message": "Verification email sent"
}
```

---

## CHANGE PASSWORD
```
POST : http://localhost:5555/api/auth/change-password
Authorization: Bearer <token>
```
input:
```json
{
    "currentPassword": "aaBC@$12",
    "newPassword": "newPass@456"
}
```
output:
```json
{
    "success": true,
    "message": "Password changed successfully"
}
```

---

## GET ME (Current User)
```
GET : http://localhost:5555/api/auth/me
Authorization: Bearer <token>
```
input: none
output:
```json
{
    "success": true,
    "data": {
        "id": 11,
        "email": "2084harsh@gmail.com",
        "phone": "7567586809",
        "role": "user",
        "email_verified": 0,
        "is_active": 1,
        "last_login_at": "2026-02-28T10:50:11.000Z",
        "created_at": "2026-02-28T10:45:29.000Z",
        "first_name": "Harsh",
        "last_name": "Patel",
        "profile_picture": null,
        "city": null,
        "bio": null
    }
}
```

---

# MODULE 2: USER PROFILE

## GET OWN PROFILE
```
GET : http://localhost:5555/api/users/profile
Authorization: Bearer <token>
```
input: none
output:
```json
{
    "success": true,
    "data": {
        "id": 11,
        "email": "2084harsh@gmail.com",
        "phone": "7567586809",
        "role": "user",
        "email_verified": 0,
        "first_name": "Harsh",
        "last_name": "Patel",
        "profile_picture": null,
        "date_of_birth": null,
        "gender": null,
        "bio": null,
        "occupation": null,
        "company_name": null,
        "city": null,
        "state": null,
        "address": null,
        "pincode": null
    }
}
```

---

## UPDATE PROFILE
```
PUT : http://localhost:5555/api/users/profile
Authorization: Bearer <token>
```
input:
```json
{
    "first_name": "Harsh",
    "last_name": "Patel",
    "phone": "7567586809",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "bio": "Real estate enthusiast",
    "occupation": "Software Engineer",
    "company_name": "Crewera"
}
```
output:
```json
{
    "success": true,
    "message": "Profile updated successfully"
}
```

---

## UPLOAD AVATAR
```
POST : http://localhost:5555/api/users/profile/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
input: form-data key `avatar` = (select image file)
output:
```json
{
    "success": true,
    "message": "Avatar uploaded",
    "data": {
        "profile_picture": "/uploads/avatars/avatar-11-1772276729.jpg"
    }
}
```

---

## GET PREFERENCES
```
GET : http://localhost:5555/api/users/preferences
Authorization: Bearer <token>
```
input: none
output:
```json
{
    "success": true,
    "data": {
        "id": 1,
        "user_id": 11,
        "property_updates": 1,
        "inquiry_responses": 1,
        "marketing_emails": 0,
        "dark_mode": 0,
        "preferred_currency": "INR",
        "preferred_language": "English"
    }
}
```

---

## UPDATE PREFERENCES
```
PUT : http://localhost:5555/api/users/preferences
Authorization: Bearer <token>
```
input:
```json
{
    "dark_mode": true,
    "preferred_currency": "INR",
    "marketing_emails": false
}
```
output:
```json
{
    "success": true,
    "message": "Preferences updated"
}
```

---

## DEACTIVATE ACCOUNT
```
DELETE : http://localhost:5555/api/users/account
Authorization: Bearer <token>
```
input: none
output:
```json
{
    "success": true,
    "message": "Account deactivated"
}
```

---

## GET LOGIN HISTORY
```
GET : http://localhost:5555/api/users/login-history?page=1&limit=20
Authorization: Bearer <token>
```
input: none (query params optional)
output:
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "login_at": "2026-02-28T10:50:11.000Z",
            "logout_at": null,
            "ip_address": "::1",
            "device_type": "Desktop",
            "browser": null,
            "os": null,
            "status": "Success"
        }
    ],
    "meta": { "page": 1, "limit": 20 }
}
```

---

## VIEW PUBLIC PROFILE
```
GET : http://localhost:5555/api/users/11/public
```
input: none
output:
```json
{
    "success": true,
    "data": {
        "id": 11,
        "role": "user",
        "first_name": "Harsh",
        "last_name": "Patel",
        "profile_picture": null,
        "city": "Ahmedabad",
        "bio": "Real estate enthusiast"
    }
}
```

---

# MODULE 3: PROPERTIES

## LIST ALL PROPERTIES
```
GET : http://localhost:5555/api/properties?page=1&limit=10
```
Optional query params: `city`, `type`, `bhk`, `price_min`, `price_max`, `stage`, `q`, `sort`, `order`
output:
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "project_name": "Sunrise Towers",
            "property_type": "Residential",
            "slug": "sunrise-towers",
            "status": "Active",
            "is_featured": 1,
            "builder_name": "ABC Builders",
            "construction_stage": "Under Construction",
            "city": "Mumbai",
            "area": "Andheri West",
            "min_price": 5500000,
            "max_price": 12000000,
            "primary_image": "/uploads/media/sunrise-main.jpg"
        }
    ],
    "meta": { "page": 1, "limit": 10, "total": 5, "totalPages": 1 }
}
```

---

## GET SINGLE PROPERTY BY SLUG
```
GET : http://localhost:5555/api/properties/detail/sunrise-towers
```
input: none
output:
```json
{
    "success": true,
    "data": {
        "id": 1,
        "project_name": "Sunrise Towers",
        "property_type": "Residential",
        "slug": "sunrise-towers",
        "builder_name": "ABC Builders",
        "description": "Premium residential project...",
        "construction_stage": "Under Construction",
        "city": "Mumbai",
        "pricing": [
            { "id": 1, "bhk_type": "2BHK", "total_price": 5500000, "size_carpet": 850 }
        ],
        "amenities": [
            { "id": 1, "amenity_name": "Swimming Pool", "amenity_category": "Recreation" }
        ],
        "media": [],
        "contacts": [],
        "milestones": [],
        "specifications": [],
        "tags": []
    }
}
```

---

## FEATURED PROPERTIES
```
GET : http://localhost:5555/api/properties/featured
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "project_name": "Sunrise Towers", "slug": "sunrise-towers", "city": "Mumbai", "min_price": 5500000 }
    ]
}
```

---

## TRENDING PROPERTIES
```
GET : http://localhost:5555/api/properties/trending
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 2, "project_name": "Green Valley", "slug": "green-valley", "city": "Pune", "trending_score": 85 }
    ]
}
```

---

## NEARBY PROPERTIES
```
GET : http://localhost:5555/api/properties/nearby?lat=19.076&lng=72.877&radius=10
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "project_name": "Sunrise Towers", "slug": "sunrise-towers", "distance": 3.45 }
    ]
}
```

---

## ADVANCED SEARCH
```
GET : http://localhost:5555/api/properties/search?city=Mumbai&type=Residential&bhk=2BHK&price_min=3000000&price_max=15000000
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "project_name": "Sunrise Towers", "slug": "sunrise-towers", "builder_name": "ABC Builders", "city": "Mumbai", "min_price": 5500000 }
    ],
    "meta": { "page": 1, "limit": 10 }
}
```

---

## GET PROPERTY PRICING
```
GET : http://localhost:5555/api/properties/1/pricing
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "property_id": 1, "bhk_type": "2BHK", "total_price": 5500000, "price_per_sqft": 6470, "size_carpet": 850, "roi": 12.5 }
    ]
}
```

---

## GET PROPERTY AMENITIES
```
GET : http://localhost:5555/api/properties/1/amenities
```

## GET PROPERTY MEDIA
```
GET : http://localhost:5555/api/properties/1/media
```

## GET PROPERTY SPECIFICATIONS
```
GET : http://localhost:5555/api/properties/1/specifications
```

## GET PROPERTY CONTACTS
```
GET : http://localhost:5555/api/properties/1/contacts
```

## GET PROPERTY MILESTONES
```
GET : http://localhost:5555/api/properties/1/milestones
```

All return: `{ "success": true, "data": [ ... ] }`

---

# MODULE 4: REVIEWS

## GET PROPERTY REVIEWS
```
GET : http://localhost:5555/api/reviews/property/1
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "user_id": 11, "property_id": 1, "rating": 4, "review_title": "Great location", "review_text": "Very good project", "status": "Approved" }
    ]
}
```

---

## SUBMIT REVIEW
```
POST : http://localhost:5555/api/reviews
Authorization: Bearer <token>
```
input:
```json
{
    "property_id": 1,
    "rating": 4,
    "review_title": "Great location and amenities",
    "review_text": "The project has excellent connectivity and modern amenities.",
    "rating_construction": 4,
    "rating_location": 5,
    "rating_amenities": 4,
    "rating_value_for_money": 3,
    "pros": "Good location, modern design",
    "cons": "Slightly expensive"
}
```
output:
```json
{
    "success": true,
    "message": "Review submitted successfully",
    "reviewId": 1
}
```

---

## UPDATE REVIEW
```
PUT : http://localhost:5555/api/reviews/1
Authorization: Bearer <token>
```
input:
```json
{
    "rating": 5,
    "review_text": "Updated â€” even better after site visit!"
}
```
output:
```json
{ "success": true, "message": "Review updated successfully" }
```

---

## DELETE REVIEW
```
DELETE : http://localhost:5555/api/reviews/1
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Review deleted successfully" }
```

---

## MARK REVIEW HELPFUL
```
POST : http://localhost:5555/api/reviews/1/helpful
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Marked as helpful" }
```

---

## REPORT REVIEW
```
POST : http://localhost:5555/api/reviews/1/report
Authorization: Bearer <token>
```
input:
```json
{ "reason": "Contains inappropriate language" }
```
output:
```json
{ "success": true, "message": "Review reported" }
```

---

# MODULE 5: FAVORITES & COMPARISONS

## GET ALL FAVORITES
```
GET : http://localhost:5555/api/favorites
Authorization: Bearer <token>
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "favorited_at": "2026-02-28T11:00:00.000Z", "property_id": 1, "project_name": "Sunrise Towers", "slug": "sunrise-towers", "city": "Mumbai" }
    ]
}
```

---

## ADD TO FAVORITES
```
POST : http://localhost:5555/api/favorites/1
Authorization: Bearer <token>
```
input: none (property_id in URL)
output:
```json
{ "success": true, "message": "Added to favorites" }
```

---

## REMOVE FROM FAVORITES
```
DELETE : http://localhost:5555/api/favorites/1
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Removed from favorites" }
```

---

## CHECK IF FAVORITED
```
GET : http://localhost:5555/api/favorites/check/1
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "data": { "isFavorited": true } }
```

---

## GET COMPARISONS
```
GET : http://localhost:5555/api/favorites/comparisons
Authorization: Bearer <token>
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "comparison_name": "Mumbai 2BHK", "property_ids": "[1,2,3]" }
    ]
}
```

---

## CREATE COMPARISON
```
POST : http://localhost:5555/api/favorites/comparisons
Authorization: Bearer <token>
```
input:
```json
{
    "comparison_name": "Mumbai 2BHK Comparison",
    "property_ids": [1, 2, 3]
}
```
output:
```json
{ "success": true, "message": "Comparison created", "data": { "id": 1 } }
```

---

## UPDATE COMPARISON
```
PUT : http://localhost:5555/api/favorites/comparisons/1
Authorization: Bearer <token>
```
input:
```json
{
    "comparison_name": "Updated Comparison",
    "property_ids": [1, 2, 3, 4]
}
```
output:
```json
{ "success": true, "message": "Comparison updated" }
```

---

## DELETE COMPARISON
```
DELETE : http://localhost:5555/api/favorites/comparisons/1
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Comparison deleted" }
```

---

# MODULE 6: INQUIRIES & CONTACT

## SUBMIT INQUIRY
```
POST : http://localhost:5555/api/inquiries
```
input:
```json
{
    "property_id": 1,
    "name": "Harsh Patel",
    "email": "2084harsh@gmail.com",
    "phone": "7567586809",
    "message": "I am interested in 2BHK unit. Please share details.",
    "inquiry_type": "General"
}
```
output:
```json
{ "success": true, "message": "Inquiry submitted successfully", "inquiryId": 1 }
```

---

## GET MY INQUIRIES
```
GET : http://localhost:5555/api/inquiries
Authorization: Bearer <token>
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "property_id": 1, "name": "Harsh Patel", "message": "I am interested...", "status": "Pending" }
    ]
}
```

---

## REQUEST CALLBACK
```
POST : http://localhost:5555/api/inquiries/callback
```
input:
```json
{
    "property_id": 1,
    "name": "Harsh Patel",
    "phone": "7567586809",
    "preferred_time": "10:00 AM - 12:00 PM"
}
```
output:
```json
{ "success": true, "message": "Callback request submitted" }
```

---

## SCHEDULE SITE VISIT
```
POST : http://localhost:5555/api/inquiries/site-visit
```
input:
```json
{
    "property_id": 1,
    "name": "Harsh Patel",
    "email": "2084harsh@gmail.com",
    "phone": "7567586809",
    "preferred_date": "2026-03-15"
}
```
output:
```json
{ "success": true, "message": "Site visit scheduled" }
```

---

## DOWNLOAD BROCHURE
```
POST : http://localhost:5555/api/inquiries/brochure/1
```
input:
```json
{
    "name": "Harsh Patel",
    "email": "2084harsh@gmail.com",
    "phone": "7567586809"
}
```
output:
```json
{ "success": true, "message": "Brochure download tracked" }
```

---

## SUBMIT CONTACT MESSAGE
```
POST : http://localhost:5555/api/contact
```
input:
```json
{
    "name": "Harsh Patel",
    "email": "2084harsh@gmail.com",
    "phone": "7567586809",
    "subject": "Partnership Inquiry",
    "message": "I would like to discuss a partnership opportunity.",
    "department": "Business"
}
```
output:
```json
{ "success": true, "message": "Message sent successfully" }
```

---

## GET FAQs
```
GET : http://localhost:5555/api/contact/faqs?category=General Questions
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "question": "How to list a property?", "answer": "Submit a property request from your dashboard.", "category": "General Questions" }
    ]
}
```

---

## MARK FAQ HELPFUL
```
POST : http://localhost:5555/api/contact/faqs/1/helpful
```
input:
```json
{ "helpful": true }
```
output:
```json
{ "success": true, "message": "Feedback recorded" }
```

---

# MODULE 7: PROPERTY REQUESTS

## CREATE PROPERTY REQUEST
```
POST : http://localhost:5555/api/property-requests
Authorization: Bearer <token>
```
input:
```json
{
    "your_name": "Harsh Patel",
    "your_email": "2084harsh@gmail.com",
    "your_phone": "7567586809",
    "your_address": "Ahmedabad, Gujarat",
    "project_name": "SG Skyline Residences",
    "property_type": "Residential",
    "special_type": "None",
    "builder_developer_name": "Adani Realty",
    "description": "Premium 3BHK apartments on SG Highway with modern amenities",
    "property_location": "SG Highway, Ahmedabad",
    "property_city": "Ahmedabad",
    "property_state": "Gujarat",
    "property_pincode": "380054",
    "property_landmarks": "Near ISCON Mall",
    "bhk_type": "3BHK",
    "total_units": 120,
    "available_units": 85,
    "size_super_buildup": 1650,
    "size_carpet": 1200,
    "facing": "East",
    "construction_stage": "Under Construction",
    "project_start_date": "2025-01-01",
    "expected_completion": "2027-12-31",
    "possession_date": "2027-06-30",
    "price_per_unit": 8500000,
    "price_per_sqft": 5150,
    "total_project_cost": 1020000000,
    "expected_revenue": 1200000000,
    "roi": 17.6,
    "rental_yield": 3.5,
    "expected_appreciation": 12,
    "booking_amount": 500000,
    "price_negotiable": false,
    "request_reason": "Looking for investment opportunity",
    "contact_person_name": "Harsh Patel",
    "contact_person_phone": "7567586809",
    "contact_person_email": "2084harsh@gmail.com",
    "contact_person_designation": "Owner",
    "proposed_amenities": [1, 2, 3, 4, 6]
}
```
output:
```json
{ "success": true, "message": "Property request submitted successfully", "requestId": 1 }
```

---

## GET MY PROPERTY REQUESTS
```
GET : http://localhost:5555/api/property-requests?page=1&limit=10&status=Pending
Authorization: Bearer <token>
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 1, "your_name": "Harsh Patel", "property_type": "Residential", "property_location": "SG Highway", "status": "Pending", "created_at": "2026-02-28T11:00:00.000Z" }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 1, "pages": 1 }
}
```

---

## GET SINGLE REQUEST
```
GET : http://localhost:5555/api/property-requests/1
Authorization: Bearer <token>
```

## UPDATE PENDING REQUEST
```
PUT : http://localhost:5555/api/property-requests/1
Authorization: Bearer <token>
```
input:
```json
{ "your_name": "Harsh V Patel", "approx_price": 9000000 }
```
output:
```json
{ "success": true, "message": "Request updated" }
```

---

## GET COMPLETION FORM
```
GET : http://localhost:5555/api/property-requests/1/completion
Authorization: Bearer <token>
```
(Only works if request status = 'Approved')

## SUBMIT COMPLETION DETAILS
```
POST : http://localhost:5555/api/property-requests/1/completion
Authorization: Bearer <token>
```
input:
```json
{
    "project_name": "SG Skyline Residences",
    "description": "A premium residential project on SG Highway",
    "property_city": "Ahmedabad",
    "property_state": "Gujarat",
    "property_pincode": "380054",
    "total_units": 120,
    "available_units": 85,
    "size_super_buildup": 1650,
    "size_carpet": 1200,
    "price_per_unit": 8500000,
    "price_per_sqft": 5150,
    "total_project_cost": 1020000000,
    "expected_revenue": 1200000000,
    "roi": 17.6,
    "rental_yield": 3.5,
    "expected_appreciation": 12,
    "booking_amount": 500000,
    "contact_person_name": "Harsh Patel",
    "contact_person_phone": "7567586809",
    "contact_person_email": "2084harsh@gmail.com",
    "contact_person_designation": "Owner"
}
```
output:
```json
{ "success": true, "message": "Completion details saved" }
```

---

## UPDATE COMPLETION (SAVE DRAFT)
```
PUT : http://localhost:5555/api/property-requests/1/completion
Authorization: Bearer <token>
```
input:
```json
{ "total_units": 130, "description": "Updated description" }
```
output:
```json
{ "success": true, "message": "Completion draft saved" }
```

---

## FINAL SUBMIT COMPLETION
```
POST : http://localhost:5555/api/property-requests/1/completion/submit
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Completion submitted for admin review" }
```

---

# MODULE 8: SAVED SEARCHES

## GET SAVED SEARCHES
```
GET : http://localhost:5555/api/saved-searches
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "data": [ { "id": 1, "search_name": "Mumbai 2BHK", "search_criteria": "{\"city\":\"Mumbai\",\"bhk\":\"2BHK\"}", "alert_enabled": 1 } ] }
```

## CREATE SAVED SEARCH
```
POST : http://localhost:5555/api/saved-searches
Authorization: Bearer <token>
```
input:
```json
{
    "search_name": "Mumbai 2BHK Under 1Cr",
    "search_criteria": { "city": "Mumbai", "bhk": "2BHK", "price_max": 10000000 },
    "alert_frequency": "Weekly",
    "alert_enabled": true
}
```
output:
```json
{ "success": true, "message": "Search saved", "data": { "id": 1 } }
```

## UPDATE SAVED SEARCH
```
PUT : http://localhost:5555/api/saved-searches/1
Authorization: Bearer <token>
```
input:
```json
{ "search_name": "Mumbai 2BHK Updated", "alert_frequency": "Daily" }
```
output:
```json
{ "success": true, "message": "Search updated" }
```

## DELETE SAVED SEARCH
```
DELETE : http://localhost:5555/api/saved-searches/1
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Search deleted" }
```

## RUN SAVED SEARCH
```
GET : http://localhost:5555/api/saved-searches/1/results?page=1&limit=10
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "data": [ { "id": 1, "project_name": "Sunrise Towers", "city": "Mumbai", "min_price": 5500000 } ], "meta": { "page": 1, "limit": 10 } }
```

---

# MODULE 9: BLOG

## LIST BLOG POSTS
```
GET : http://localhost:5555/api/blog?page=1&limit=9&category=1
```

## GET SINGLE POST
```
GET : http://localhost:5555/api/blog/top-10-investments-2026
```

## FEATURED POSTS
```
GET : http://localhost:5555/api/blog/posts/featured
```

## ALL CATEGORIES
```
GET : http://localhost:5555/api/blog/categories/all
```

## POSTS BY CATEGORY
```
GET : http://localhost:5555/api/blog/categories/real-estate/posts
```

## GET COMMENTS
```
GET : http://localhost:5555/api/blog/1/comments
```

## ADD COMMENT
```
POST : http://localhost:5555/api/blog/1/comments
```
input:
```json
{ "commenter_name": "Harsh", "commenter_email": "2084harsh@gmail.com", "comment_text": "Very informative article!" }
```
output:
```json
{ "success": true, "message": "Comment submitted for moderation" }
```

## LIKE POST
```
POST : http://localhost:5555/api/blog/1/like
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Post liked" }
```

---

# MODULE 10: TESTIMONIALS

## GET ALL TESTIMONIALS
```
GET : http://localhost:5555/api/testimonials?page=1&limit=10
```

## GET FEATURED TESTIMONIALS
```
GET : http://localhost:5555/api/testimonials/featured
```

## GET SINGLE TESTIMONIAL
```
GET : http://localhost:5555/api/testimonials/1
```

## SUBMIT TESTIMONIAL
```
POST : http://localhost:5555/api/testimonials
Authorization: Bearer <token>
```
input:
```json
{ "testimonial_text": "Crewera helped me find my dream home in Mumbai! Excellent service.", "rating": 5, "property_id": 1 }
```
output:
```json
{ "success": true, "message": "Testimonial submitted for review" }
```

## UPDATE TESTIMONIAL
```
PUT : http://localhost:5555/api/testimonials/1
Authorization: Bearer <token>
```

## DELETE TESTIMONIAL
```
DELETE : http://localhost:5555/api/testimonials/1
Authorization: Bearer <token>
```

---

# MODULE 11: NOTIFICATIONS

## GET NOTIFICATIONS
```
GET : http://localhost:5555/api/notifications?page=1&limit=20
Authorization: Bearer <token>
```
output:
```json
{
    "success": true,
    "data": [ { "id": 1, "notification_type": "Property Update", "title": "Price Drop!", "message": "Sunrise Towers price reduced by 5%", "is_read": 0 } ],
    "meta": { "page": 1, "limit": 20 }
}
```

## GET UNREAD COUNT
```
GET : http://localhost:5555/api/notifications/unread-count
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "data": { "unreadCount": 3 } }
```

## MARK AS READ
```
PATCH : http://localhost:5555/api/notifications/1/read
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Notification marked as read" }
```

## MARK ALL READ
```
PATCH : http://localhost:5555/api/notifications/read-all
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "All notifications marked as read" }
```

## DELETE NOTIFICATION
```
DELETE : http://localhost:5555/api/notifications/1
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Notification deleted" }
```

---

# MODULE 12: ANALYTICS (Public)

## PRICE HISTORY
```
GET : http://localhost:5555/api/analytics/properties/1/price-history
```
output:
```json
{ "success": true, "data": [ { "id": 1, "bhk_type": "2BHK", "old_price": 5000000, "new_price": 5500000, "effective_date": "2026-01-15" } ] }
```

## PROPERTY ANALYTICS
```
GET : http://localhost:5555/api/analytics/properties/1/analytics
```
output:
```json
{ "success": true, "data": { "property_id": 1, "total_views": 245, "total_inquiries": 18, "total_favorites": 32 } }
```

## MARKET TRENDS
```
GET : http://localhost:5555/api/analytics/market-trends
```

## TOP CITIES
```
GET : http://localhost:5555/api/analytics/top-cities
```

---

# MODULE 13: TAGS

## LIST ALL TAGS
```
GET : http://localhost:5555/api/tags
```
output:
```json
{ "success": true, "data": [ { "tag_group": "Lifestyle", "tags": [ { "id": 1, "tag_name": "Luxury" }, { "id": 2, "tag_name": "Budget" } ] } ] }
```

## PROPERTIES BY TAG
```
GET : http://localhost:5555/api/tags/Luxury/properties?page=1&limit=10
```

## TAG AUTOCOMPLETE
```
GET : http://localhost:5555/api/tags/autocomplete?q=lux
```
output:
```json
{ "success": true, "data": [ { "id": 1, "tag_name": "Luxury", "tag_group": "Lifestyle" } ] }
```

---

# ADMIN APIs

> **All admin routes require:** Authorization: Bearer <adminToken>
> **Login as admin first**, then use that token for all admin routes.

---

# MODULE 14: ADMIN â€” USER MANAGEMENT

## LIST ALL USERS
```
GET : http://localhost:5555/api/admin/users?page=1&limit=20&role=user&status=active&q=harsh
Authorization: Bearer <adminToken>
```
output:
```json
{
    "success": true,
    "data": [
        { "id": 11, "email": "2084harsh@gmail.com", "role": "user", "is_active": 1, "first_name": "Harsh", "last_name": "Patel", "created_at": "2026-02-28T10:45:29.000Z" }
    ],
    "meta": { "page": 1, "limit": 20, "total": 1 }
}
```

## USER STATS
```
GET : http://localhost:5555/api/admin/users/stats
Authorization: Bearer <adminToken>
```

## GET USER DETAIL
```
GET : http://localhost:5555/api/admin/users/11
Authorization: Bearer <adminToken>
```

## UPDATE USER
```
PUT : http://localhost:5555/api/admin/users/11
Authorization: Bearer <adminToken>
```
input:
```json
{ "role": "agent", "is_active": true, "email_verified": true }
```
output:
```json
{ "success": true, "message": "User updated" }
```

## ACTIVATE/DEACTIVATE USER
```
PATCH : http://localhost:5555/api/admin/users/11/activate
Authorization: Bearer <adminToken>
```
input:
```json
{ "is_active": true }
```

## CHANGE USER ROLE
```
PATCH : http://localhost:5555/api/admin/users/11/role
Authorization: Bearer <adminToken>
```
input:
```json
{ "role": "agent" }
```

## DELETE USER
```
DELETE : http://localhost:5555/api/admin/users/11
Authorization: Bearer <adminToken>
```

## GET USER ACTIVITY
```
GET : http://localhost:5555/api/admin/users/11/activity?page=1&limit=20
Authorization: Bearer <adminToken>
```

---

# MODULE 15: ADMIN â€” PROPERTY MANAGEMENT

## LIST ALL PROPERTIES
```
GET : http://localhost:5555/api/admin/properties?page=1&status=Active&property_type=Residential&city=Ahmedabad
Authorization: Bearer <adminToken>
```

## CREATE PROPERTY
```
POST : http://localhost:5555/api/admin/properties
Authorization: Bearer <adminToken>
```
input:
```json
{
    "project_name": "Royal Heights",
    "property_type": "Residential",
    "special_type": "None",
    "builder_name": "Adani Realty",
    "description": "A luxurious residential tower in South Mumbai",
    "total_units": 200,
    "available_units": 150,
    "address": "Marine Drive",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zip_code": "400002",
    "construction_stage": "Under Construction",
    "completion_percent": 35,
    "expected_completion": "2028-12-31",
    "possession_date": "2029-03-31",
    "rera_number": "P51900032847",
    "is_featured": true
}
```
output:
```json
{ "success": true, "message": "Property created", "data": { "id": 2, "slug": "royal-heights-m2abc" } }
```

## UPDATE PROPERTY
```
PUT : http://localhost:5555/api/admin/properties/2
Authorization: Bearer <adminToken>
```
input:
```json
{ "project_name": "Royal Heights Premium", "property_type": "Residential" }
```

## DELETE PROPERTY
```
DELETE : http://localhost:5555/api/admin/properties/2
Authorization: Bearer <adminToken>
```

## CHANGE STATUS
```
PATCH : http://localhost:5555/api/admin/properties/2/status
Authorization: Bearer <adminToken>
```
input:
```json
{ "status": "Active" }
```

## UPDATE DETAILS
```
PUT : http://localhost:5555/api/admin/properties/2/details
Authorization: Bearer <adminToken>
```
input:
```json
{ "builder_name": "Adani Realty Ltd", "description": "Updated description", "total_units": 250, "is_featured": true }
```

## UPDATE CONSTRUCTION
```
PUT : http://localhost:5555/api/admin/properties/2/construction
Authorization: Bearer <adminToken>
```
input:
```json
{ "construction_stage": "Under Construction", "completion_percent": 45, "possession_date": "2029-06-30" }
```

## UPDATE LOCATION
```
PUT : http://localhost:5555/api/admin/properties/2/location
Authorization: Bearer <adminToken>
```
input:
```json
{ "address": "Marine Drive, South Mumbai", "city": "Mumbai", "state": "Maharashtra", "latitude": 18.9432, "longitude": 72.8237 }
```

## UPDATE LEGAL
```
PUT : http://localhost:5555/api/admin/properties/2/legal
Authorization: Bearer <adminToken>
```
input:
```json
{ "rera_number": "P51900032847", "rera_status": "Registered" }
```

## UPDATE BUILDING SPECS
```
PUT : http://localhost:5555/api/admin/properties/2/building-specs
Authorization: Bearer <adminToken>
```
input:
```json
{ "storeys": 25, "lifts": 4, "structure_type": "RCC" }
```

## UPDATE UTILITIES
```
PUT : http://localhost:5555/api/admin/properties/2/utilities
Authorization: Bearer <adminToken>
```
input:
```json
{ "electricity_provider": "MSEDCL", "water_source": "Municipal + Borewell" }
```

## ADD AMENITIES
```
POST : http://localhost:5555/api/admin/properties/2/amenities
Authorization: Bearer <adminToken>
```
input:
```json
{ "amenity_ids": [1, 2, 3, 4] }
```
output:
```json
{ "success": true, "message": "4 amenities added" }
```

## ADD TAGS
```
POST : http://localhost:5555/api/admin/properties/2/tags
Authorization: Bearer <adminToken>
```
input:
```json
{ "tag_ids": [1, 2] }
```

## ADD CONTACT
```
POST : http://localhost:5555/api/admin/properties/2/contacts
Authorization: Bearer <adminToken>
```
input:
```json
{ "contact_type": "Sales Manager", "name": "Rahul Shah", "mobile": "9876543210", "email": "rahul@adani.com" }
```

---

# MODULE 16: ADMIN â€” PRICING & UNITS

## GET PROPERTY PRICING
```
GET : http://localhost:5555/api/admin/pricing/2/pricing
Authorization: Bearer <adminToken>
```

## ADD PRICING
```
POST : http://localhost:5555/api/admin/pricing/2/add
Authorization: Bearer <adminToken>
```
input:
```json
{ "bhk_type": "2BHK", "price": 5500000, "total_units": 50, "available_units": 30, "size_carpet": 850, "size_super_buildup": 1100, "roi": 12.5, "price_per_sqft": 6470, "booking_amount": 500000 }
```

## UPDATE PRICING (with price history)
```
PUT : http://localhost:5555/api/admin/pricing/1
Authorization: Bearer <adminToken>
```
input:
```json
{ "price": 6000000, "change_reason": "Market adjustment Q2 2026" }
```

## DELETE PRICING
```
DELETE : http://localhost:5555/api/admin/pricing/1
Authorization: Bearer <adminToken>
```

## ADD UNIT SPECIFICATION
```
POST : http://localhost:5555/api/admin/pricing/2/specifications
Authorization: Bearer <adminToken>
```
input:
```json
{ "bhk_type": "2BHK", "facing": "East", "floor_number": 5, "unit_number": "A-501" }
```

## UPDATE SPECIFICATION
```
PUT : http://localhost:5555/api/admin/pricing/specifications/1
Authorization: Bearer <adminToken>
```
input:
```json
{ "facing": "North-East", "is_available": true }
```

---

# MODULE 17: ADMIN â€” MEDIA

## UPLOAD MEDIA
```
POST : http://localhost:5555/api/admin/media/2/upload
Authorization: Bearer <adminToken>
Content-Type: multipart/form-data
```
input: form-data: media (file), category_id=1, title="Front View", is_primary=true

## UPDATE MEDIA
```
PUT : http://localhost:5555/api/admin/media/1
Authorization: Bearer <adminToken>
```
input:
```json
{ "title": "Updated Front View", "alt_text": "Building front view", "display_order": 1 }
```

## DELETE MEDIA
```
DELETE : http://localhost:5555/api/admin/media/1
Authorization: Bearer <adminToken>
```

## SET AS PRIMARY
```
PATCH : http://localhost:5555/api/admin/media/1/primary
Authorization: Bearer <adminToken>
```

---

# MODULE 18: ADMIN â€” MILESTONES

## ADD MILESTONE
```
POST : http://localhost:5555/api/admin/milestones/2/add
Authorization: Bearer <adminToken>
```
input:
```json
{ "milestone_name": "Foundation Complete", "milestone_type": "Foundation", "target_date": "2026-06-01", "status": "In Progress", "completion_percent": 60 }
```

## UPDATE MILESTONE
```
PUT : http://localhost:5555/api/admin/milestones/1
Authorization: Bearer <adminToken>
```
input:
```json
{ "completion_percent": 80, "status": "In Progress" }
```

## DELETE MILESTONE
```
DELETE : http://localhost:5555/api/admin/milestones/1
Authorization: Bearer <adminToken>
```

## MARK COMPLETE
```
PATCH : http://localhost:5555/api/admin/milestones/1/complete
Authorization: Bearer <adminToken>
```
output:
```json
{ "success": true, "message": "Milestone marked as completed" }
```

---

# MODULE 19: ADMIN â€” LEADS & INQUIRIES

## LIST LEADS
```
GET : http://localhost:5555/api/admin/leads?status=New&type=Buyer&assigned_to=1
Authorization: Bearer <adminToken>
```

## LEAD STATS
```
GET : http://localhost:5555/api/admin/leads/stats
Authorization: Bearer <adminToken>
```

## GET LEAD DETAIL
```
GET : http://localhost:5555/api/admin/leads/1
Authorization: Bearer <adminToken>
```

## UPDATE LEAD STATUS
```
PATCH : http://localhost:5555/api/admin/leads/1/status
Authorization: Bearer <adminToken>
```
input:
```json
{ "lead_status": "Contacted" }
```

## ASSIGN LEAD
```
PATCH : http://localhost:5555/api/admin/leads/1/assign
Authorization: Bearer <adminToken>
```
input:
```json
{ "assigned_to": 2 }
```

## SET FOLLOW-UP
```
PATCH : http://localhost:5555/api/admin/leads/1/follow-up
Authorization: Bearer <adminToken>
```
input:
```json
{ "next_follow_up": "2026-03-15" }
```

## LIST INQUIRIES
```
GET : http://localhost:5555/api/admin/leads/inquiries/all?status=Pending
Authorization: Bearer <adminToken>
```

## INQUIRY STATS
```
GET : http://localhost:5555/api/admin/leads/inquiries/stats
Authorization: Bearer <adminToken>
```

## REPLY TO INQUIRY
```
PATCH : http://localhost:5555/api/admin/leads/inquiries/1/reply
Authorization: Bearer <adminToken>
```
input:
```json
{ "admin_response": "Thank you for your interest. Our sales team will contact you shortly." }
```

## UPDATE INQUIRY STATUS
```
PATCH : http://localhost:5555/api/admin/leads/inquiries/1/status
Authorization: Bearer <adminToken>
```
input:
```json
{ "status": "Closed" }
```

---

# MODULE 7: PROPERTY REQUESTS

## CREATE PROPERTY REQUEST
```
POST : http://localhost:5555/api/property-requests
Authorization: Bearer <token>
```
input:
```json
{
    "your_name": "Harsh Patel",
    "your_email": "2084harsh@gmail.com",
    "your_phone": "7567586809",
    "your_address": "Ahmedabad, Gujarat",
    "property_type": "Residential",
    "property_location": "SG Highway, Ahmedabad",
    "property_landmarks": "Near ISCON Mall",
    "builder_developer_name": "Adani Realty",
    "bhk_type": "3BHK",
    "special_type": "None",
    "approx_price": 8500000,
    "size_sqft": 1450,
    "facing": "East",
    "construction_stage": "Under Construction",
    "project_start_date": "2025-01-01",
    "possession_date": "2027-06-30",
    "request_reason": "Looking for investment opportunity"
}
```
output:
```json
{ "success": true, "message": "Property request submitted successfully", "requestId": 1 }
```

---

## GET MY PROPERTY REQUESTS
```
GET : http://localhost:5555/api/property-requests?page=1&limit=10&status=Pending
Authorization: Bearer <token>
```
output:
```json
{
    "success": true,
    "data": [ { "id": 1, "your_name": "Harsh Patel", "property_type": "Residential", "status": "Pending" } ],
    "pagination": { "page": 1, "limit": 10, "total": 1, "pages": 1 }
}
```

---

## GET SINGLE REQUEST
```
GET : http://localhost:5555/api/property-requests/1
Authorization: Bearer <token>
```

## UPDATE PENDING REQUEST
```
PUT : http://localhost:5555/api/property-requests/1
Authorization: Bearer <token>
```
input:
```json
{ "your_name": "Harsh V Patel", "approx_price": 9000000 }
```
output:
```json
{ "success": true, "message": "Request updated" }
```

---

## GET COMPLETION FORM (after admin approves)
```
GET : http://localhost:5555/api/property-requests/1/completion
Authorization: Bearer <token>
```

## SUBMIT COMPLETION DETAILS
```
POST : http://localhost:5555/api/property-requests/1/completion
Authorization: Bearer <token>
```
input:
```json
{
    "project_name": "SG Skyline Residences",
    "description": "Premium residential project on SG Highway",
    "property_city": "Ahmedabad",
    "property_state": "Gujarat",
    "property_pincode": "380054",
    "total_units": 120,
    "available_units": 85,
    "size_super_buildup": 1650,
    "size_carpet": 1200,
    "price_per_unit": 8500000,
    "price_per_sqft": 5150,
    "expected_revenue": 1200000000,
    "roi": 17.6,
    "rental_yield": 3.5,
    "booking_amount": 500000,
    "contact_person_name": "Harsh Patel",
    "contact_person_phone": "7567586809",
    "contact_person_email": "2084harsh@gmail.com",
    "contact_person_designation": "Owner"
}
```
output:
```json
{ "success": true, "message": "Completion details saved" }
```

## UPDATE COMPLETION (SAVE DRAFT)
```
PUT : http://localhost:5555/api/property-requests/1/completion
Authorization: Bearer <token>
```
input: `{ "total_units": 130, "description": "Updated" }`

## FINAL SUBMIT COMPLETION
```
POST : http://localhost:5555/api/property-requests/1/completion/submit
Authorization: Bearer <token>
```
output:
```json
{ "success": true, "message": "Completion submitted for admin review" }
```

---

# MODULE 8: SAVED SEARCHES

## GET SAVED SEARCHES
```
GET : http://localhost:5555/api/saved-searches
Authorization: Bearer <token>
```

## CREATE SAVED SEARCH
```
POST : http://localhost:5555/api/saved-searches
Authorization: Bearer <token>
```
input:
```json
{
    "search_name": "Mumbai 2BHK Under 1Cr",
    "search_criteria": { "city": "Mumbai", "bhk": "2BHK", "price_max": 10000000 },
    "alert_frequency": "Weekly",
    "alert_enabled": true
}
```
output:
```json
{ "success": true, "message": "Search saved", "data": { "id": 1 } }
```

## UPDATE SAVED SEARCH
```
PUT : http://localhost:5555/api/saved-searches/1
Authorization: Bearer <token>
```
input: `{ "search_name": "Updated Name", "alert_frequency": "Daily" }`

## DELETE SAVED SEARCH
```
DELETE : http://localhost:5555/api/saved-searches/1
Authorization: Bearer <token>
```

## RUN SAVED SEARCH RESULTS
```
GET : http://localhost:5555/api/saved-searches/1/results?page=1&limit=10
Authorization: Bearer <token>
```

---

# MODULE 9: BLOG

## LIST POSTS: `GET : http://localhost:5555/api/blog?page=1&limit=9`
## GET POST: `GET : http://localhost:5555/api/blog/top-10-investments-2026`
## FEATURED: `GET : http://localhost:5555/api/blog/posts/featured`
## CATEGORIES: `GET : http://localhost:5555/api/blog/categories/all`
## BY CATEGORY: `GET : http://localhost:5555/api/blog/categories/real-estate/posts`
## COMMENTS: `GET : http://localhost:5555/api/blog/1/comments`

## ADD COMMENT
```
POST : http://localhost:5555/api/blog/1/comments
```
input:
```json
{ "commenter_name": "Harsh", "commenter_email": "2084harsh@gmail.com", "comment_text": "Very informative!" }
```

## LIKE POST
```
POST : http://localhost:5555/api/blog/1/like
Authorization: Bearer <token>
```

---

# MODULE 10: TESTIMONIALS

## LIST: `GET : http://localhost:5555/api/testimonials?page=1&limit=10`
## FEATURED: `GET : http://localhost:5555/api/testimonials/featured`
## SINGLE: `GET : http://localhost:5555/api/testimonials/1`

## SUBMIT TESTIMONIAL
```
POST : http://localhost:5555/api/testimonials
Authorization: Bearer <token>
```
input:
```json
{ "testimonial_text": "Crewera helped me find my dream home!", "rating": 5, "property_id": 1 }
```

## UPDATE: `PUT : http://localhost:5555/api/testimonials/1` (Auth)
## DELETE: `DELETE : http://localhost:5555/api/testimonials/1` (Auth)

---

# MODULE 11: NOTIFICATIONS

## GET: `GET : http://localhost:5555/api/notifications?page=1&limit=20` (Auth)
## UNREAD COUNT: `GET : http://localhost:5555/api/notifications/unread-count` (Auth)
## MARK READ: `PATCH : http://localhost:5555/api/notifications/1/read` (Auth)
## MARK ALL READ: `PATCH : http://localhost:5555/api/notifications/read-all` (Auth)
## DELETE: `DELETE : http://localhost:5555/api/notifications/1` (Auth)

---

# MODULE 12: ANALYTICS (Public)

## PRICE HISTORY: `GET : http://localhost:5555/api/analytics/properties/1/price-history`
## ANALYTICS: `GET : http://localhost:5555/api/analytics/properties/1/analytics`
## MARKET TRENDS: `GET : http://localhost:5555/api/analytics/market-trends`
## TOP CITIES: `GET : http://localhost:5555/api/analytics/top-cities`

---

# MODULE 13: TAGS

## LIST TAGS: `GET : http://localhost:5555/api/tags`
## BY TAG: `GET : http://localhost:5555/api/tags/Luxury/properties?page=1&limit=10`
## AUTOCOMPLETE: `GET : http://localhost:5555/api/tags/autocomplete?q=lux`

# ADMIN APIs

> **All admin routes require:** `Authorization: Bearer <adminToken>`
> Login as admin first, then use that token.

---

# MODULE 14: ADMIN â€” USER MANAGEMENT

## LIST USERS
```
GET : http://localhost:5555/api/admin/users?page=1&limit=20&role=user&status=active&q=harsh
Authorization: Bearer <adminToken>
```
output:
```json
{
    "success": true,
    "data": [ { "id": 11, "email": "2084harsh@gmail.com", "role": "user", "is_active": 1, "first_name": "Harsh", "last_name": "Patel" } ],
    "meta": { "page": 1, "limit": 20, "total": 1 }
}
```

## USER STATS: `GET : http://localhost:5555/api/admin/users/stats`
## GET USER: `GET : http://localhost:5555/api/admin/users/11`

## UPDATE USER
```
PUT : http://localhost:5555/api/admin/users/11
Authorization: Bearer <adminToken>
```
input: `{ "role": "agent", "is_active": true, "email_verified": true }`

## ACTIVATE USER
```
PATCH : http://localhost:5555/api/admin/users/11/activate
Authorization: Bearer <adminToken>
```
input: `{ "is_active": true }`

## CHANGE ROLE
```
PATCH : http://localhost:5555/api/admin/users/11/role
Authorization: Bearer <adminToken>
```
input: `{ "role": "agent" }`

## DELETE USER: `DELETE : http://localhost:5555/api/admin/users/11`
## USER ACTIVITY: `GET : http://localhost:5555/api/admin/users/11/activity?page=1`

---

# MODULE 15: ADMIN â€” PROPERTY MANAGEMENT

## LIST: `GET : http://localhost:5555/api/admin/properties?page=1&status=Active&type=Residential`

## CREATE PROPERTY
```
POST : http://localhost:5555/api/admin/properties
Authorization: Bearer <adminToken>
```
input:
```json
{
    "project_name": "Royal Heights",
    "property_type": "Residential",
    "special_type": "None",
    "builder_name": "Adani Realty",
    "description": "Luxurious residential tower in South Mumbai",
    "total_units": 200,
    "available_units": 150,
    "address": "Marine Drive",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zip_code": "400002",
    "construction_stage": "Under Construction",
    "completion_percent": 35,
    "expected_completion": "2028-12-31",
    "possession_date": "2029-03-31",
    "rera_number": "P51900032847",
    "is_featured": true
}
```
output:
```json
{ "success": true, "message": "Property created", "data": { "id": 2, "slug": "royal-heights-m2abc" } }
```

## UPDATE: `PUT : http://localhost:5555/api/admin/properties/2` â†’ `{ "project_name": "Royal Heights Premium" }`
## DELETE: `DELETE : http://localhost:5555/api/admin/properties/2`
## STATUS: `PATCH : http://localhost:5555/api/admin/properties/2/status` â†’ `{ "status": "Active" }`
## DETAILS: `PUT : http://localhost:5555/api/admin/properties/2/details` â†’ `{ "builder_name": "Adani Ltd", "is_featured": true }`
## CONSTRUCTION: `PUT : http://localhost:5555/api/admin/properties/2/construction` â†’ `{ "construction_stage": "Under Construction", "completion_percent": 45 }`
## LOCATION: `PUT : http://localhost:5555/api/admin/properties/2/location` â†’ `{ "address": "Marine Drive", "city": "Mumbai", "latitude": 18.9432, "longitude": 72.8237 }`
## LEGAL: `PUT : http://localhost:5555/api/admin/properties/2/legal` â†’ `{ "rera_number": "P51900032847", "rera_status": "Registered" }`
## BUILDING SPECS: `PUT : http://localhost:5555/api/admin/properties/2/building-specs` â†’ `{ "storeys": 25, "lifts": 4 }`
## UTILITIES: `PUT : http://localhost:5555/api/admin/properties/2/utilities` â†’ `{ "electricity_provider": "MSEDCL" }`
## ADD AMENITIES: `POST : http://localhost:5555/api/admin/properties/2/amenities` â†’ `{ "amenity_ids": [1, 2, 3] }`
## ADD TAGS: `POST : http://localhost:5555/api/admin/properties/2/tags` â†’ `{ "tag_ids": [1, 2] }`
## ADD CONTACT: `POST : http://localhost:5555/api/admin/properties/2/contacts` â†’ `{ "contact_type": "Sales", "name": "Rahul", "mobile": "9876543210" }`

---

# MODULE 16: ADMIN â€” PRICING & UNITS

## GET PRICING: `GET : http://localhost:5555/api/admin/pricing/2/pricing`

## ADD PRICING
```
POST : http://localhost:5555/api/admin/pricing/2/add
Authorization: Bearer <adminToken>
```
input:
```json
{ "bhk_type": "2BHK", "price": 5500000, "total_units": 50, "available_units": 30, "size_carpet": 850, "roi": 12.5, "price_per_sqft": 6470, "booking_amount": 500000 }
```

## UPDATE PRICING: `PUT : http://localhost:5555/api/admin/pricing/1` â†’ `{ "price": 6000000, "change_reason": "Market adjustment" }`
## DELETE PRICING: `DELETE : http://localhost:5555/api/admin/pricing/1`
## ADD SPEC: `POST : http://localhost:5555/api/admin/pricing/2/specifications` â†’ `{ "bhk_type": "2BHK", "facing": "East", "floor_number": 5 }`
## UPDATE SPEC: `PUT : http://localhost:5555/api/admin/pricing/specifications/1` â†’ `{ "facing": "North-East" }`

---

# MODULE 17: ADMIN â€” MEDIA

## UPLOAD: `POST : http://localhost:5555/api/admin/media/2/upload` (form-data: media file, category_id, title, is_primary)
## UPDATE: `PUT : http://localhost:5555/api/admin/media/1` â†’ `{ "title": "Front View", "display_order": 1 }`
## DELETE: `DELETE : http://localhost:5555/api/admin/media/1`
## SET PRIMARY: `PATCH : http://localhost:5555/api/admin/media/1/primary`

---

# MODULE 18: ADMIN â€” MILESTONES

## ADD: `POST : http://localhost:5555/api/admin/milestones/2/add` â†’ `{ "milestone_name": "Foundation", "target_date": "2026-06-01", "status": "In Progress" }`
## UPDATE: `PUT : http://localhost:5555/api/admin/milestones/1` â†’ `{ "completion_percent": 80 }`
## DELETE: `DELETE : http://localhost:5555/api/admin/milestones/1`
## COMPLETE: `PATCH : http://localhost:5555/api/admin/milestones/1/complete`

---

# MODULE 19: ADMIN â€” LEADS & INQUIRIES

## LIST LEADS: `GET : http://localhost:5555/api/admin/leads?status=New&assigned_to=1`
## LEAD STATS: `GET : http://localhost:5555/api/admin/leads/stats`
## LEAD DETAIL: `GET : http://localhost:5555/api/admin/leads/1`
## UPDATE STATUS: `PATCH : http://localhost:5555/api/admin/leads/1/status` â†’ `{ "lead_status": "Contacted" }`
## ASSIGN: `PATCH : http://localhost:5555/api/admin/leads/1/assign` â†’ `{ "assigned_to": 2 }`
## FOLLOW-UP: `PATCH : http://localhost:5555/api/admin/leads/1/follow-up` â†’ `{ "next_follow_up": "2026-03-15" }`
## LIST INQUIRIES: `GET : http://localhost:5555/api/admin/leads/inquiries/all?status=Pending`
## INQUIRY STATS: `GET : http://localhost:5555/api/admin/leads/inquiries/stats`
## REPLY: `PATCH : http://localhost:5555/api/admin/leads/inquiries/1/reply` â†’ `{ "admin_response": "We will contact you shortly" }`
## INQ STATUS: `PATCH : http://localhost:5555/api/admin/leads/inquiries/1/status` â†’ `{ "status": "Closed" }`

---

# MODULE 20: ADMIN â€” PROPERTY REQUESTS

## LIST: `GET : http://localhost:5555/api/admin/property-requests?status=Pending&roi_min=10`
## STATS: `GET : http://localhost:5555/api/admin/property-requests/stats/overview`
## DETAIL: `GET : http://localhost:5555/api/admin/property-requests/1`
## REVIEW: `PATCH : http://localhost:5555/api/admin/property-requests/1/review` â†’ `{ "admin_notes": "Reviewing ROI" }`
## APPROVE: `PATCH : http://localhost:5555/api/admin/property-requests/1/approve` â†’ `{ "admin_notes": "ROI verified" }`
## REJECT: `PATCH : http://localhost:5555/api/admin/property-requests/1/reject` â†’ `{ "rejection_reason": "Insufficient docs" }`
## VIEW COMPLETION: `GET : http://localhost:5555/api/admin/property-requests/1/completion`
## VERIFY & LIST: `PATCH : http://localhost:5555/api/admin/property-requests/1/verify-completion` (creates property listing)

---

# MODULE 21: ADMIN â€” BLOG

## LIST POSTS: `GET : http://localhost:5555/api/admin/blog/posts?status=Draft`

## CREATE POST
```
POST : http://localhost:5555/api/admin/blog/posts
Authorization: Bearer <adminToken>
```
input:
```json
{ "title": "Top 10 Investments 2026", "slug": "top-10-investments-2026", "content": "Full article...", "excerpt": "Summary", "category_id": 1, "status": "Published" }
```

## UPDATE POST: `PUT : http://localhost:5555/api/admin/blog/posts/1` â†’ `{ "title": "Updated", "status": "Draft" }`
## DELETE POST: `DELETE : http://localhost:5555/api/admin/blog/posts/1`
## PUBLISH: `PATCH : http://localhost:5555/api/admin/blog/posts/1/publish` â†’ `{ "status": "Published" }`
## APPROVE COMMENT: `PATCH : http://localhost:5555/api/admin/blog/comments/1/approve` â†’ `{ "is_approved": true }`
## DELETE COMMENT: `DELETE : http://localhost:5555/api/admin/blog/comments/1`
## CREATE CATEGORY: `POST : http://localhost:5555/api/admin/blog/categories` â†’ `{ "name": "Real Estate", "slug": "real-estate" }`
## UPDATE CATEGORY: `PUT : http://localhost:5555/api/admin/blog/categories/1` â†’ `{ "name": "Real Estate Tips" }`
## DELETE CATEGORY: `DELETE : http://localhost:5555/api/admin/blog/categories/1`

---

# MODULE 22: ADMIN â€” CONTENT MODERATION

## LIST REVIEWS: `GET : http://localhost:5555/api/admin/content/reviews?status=Pending`
## APPROVE REVIEW: `PATCH : http://localhost:5555/api/admin/content/reviews/1/approve` â†’ `{ "status": "Approved" }`
## DELETE REVIEW: `DELETE : http://localhost:5555/api/admin/content/reviews/1`
## LIST TESTIMONIALS: `GET : http://localhost:5555/api/admin/content/testimonials?status=Pending`
## APPROVE TESTIMONIAL: `PATCH : http://localhost:5555/api/admin/content/testimonials/1/approve` â†’ `{ "status": "Approved", "is_featured": true }`
## DELETE TESTIMONIAL: `DELETE : http://localhost:5555/api/admin/content/testimonials/1`
## CREATE FAQ: `POST : http://localhost:5555/api/admin/content/faqs` â†’ `{ "question": "How to list?", "answer": "Submit a request.", "category": "General Questions" }`
## UPDATE FAQ: `PUT : http://localhost:5555/api/admin/content/faqs/1` â†’ `{ "answer": "Updated answer", "is_active": true }`
## DELETE FAQ: `DELETE : http://localhost:5555/api/admin/content/faqs/1`
## LIST CONTACTS: `GET : http://localhost:5555/api/admin/content/contact-messages?is_read=false`
## REPLY CONTACT: `PATCH : http://localhost:5555/api/admin/content/contact-messages/1/reply` â†’ `{ "response": "Thank you" }`
## MARK READ: `PATCH : http://localhost:5555/api/admin/content/contact-messages/1/read`

---

# MODULE 23: ADMIN â€” NOTIFICATIONS

## SEND TO USERS
```
POST : http://localhost:5555/api/admin/notifications/send
Authorization: Bearer <adminToken>
```
input:
```json
{ "user_ids": [1, 2, 11], "title": "New Property Alert", "message": "Check out Royal Heights!", "notification_type": "Property Update" }
```

## BROADCAST
```
POST : http://localhost:5555/api/admin/notifications/broadcast
Authorization: Bearer <adminToken>
```
input:
```json
{ "title": "System Update", "message": "New features added!", "target_role": "user" }
```

## LIST TEMPLATES: `GET : http://localhost:5555/api/admin/notifications/templates`
## CREATE TEMPLATE: `POST : http://localhost:5555/api/admin/notifications/templates` â†’ `{ "template_name": "Welcome", "template_type": "Email", "subject_template": "Welcome!", "body_template": "Hi {{name}}..." }`
## UPDATE TEMPLATE: `PUT : http://localhost:5555/api/admin/notifications/templates/1` â†’ `{ "body_template": "Updated" }`
## DELETE TEMPLATE: `DELETE : http://localhost:5555/api/admin/notifications/templates/1`

---

# MODULE 24: ADMIN â€” AMENITY & TAG MASTERS

## LIST AMENITIES: `GET : http://localhost:5555/api/admin/masters/amenities`
## CREATE AMENITY: `POST : http://localhost:5555/api/admin/masters/amenities` â†’ `{ "amenity_name": "Swimming Pool", "amenity_category": "Recreation", "is_premium": true }`
## UPDATE AMENITY: `PUT : http://localhost:5555/api/admin/masters/amenities/1` â†’ `{ "icon_name": "pool" }`
## LIST TAGS: `GET : http://localhost:5555/api/admin/masters/tags`
## CREATE TAG: `POST : http://localhost:5555/api/admin/masters/tags` â†’ `{ "tag_name": "Luxury", "tag_group": "Lifestyle" }`
## UPDATE TAG: `PUT : http://localhost:5555/api/admin/masters/tags/1` â†’ `{ "tag_name": "Ultra Luxury" }`
## DELETE TAG: `DELETE : http://localhost:5555/api/admin/masters/tags/1`

---

# MODULE 25: ADMIN â€” DASHBOARD & ANALYTICS

## OVERVIEW: `GET : http://localhost:5555/api/admin/dashboard/overview`
output:
```json
{
    "success": true,
    "data": {
        "totalUsers": 150,
        "activeProperties": 45,
        "totalLeads": 320,
        "totalInquiries": 180,
        "totalRevenue": 2500000000,
        "newUsersToday": 5,
        "pendingProperties": 3
    }
}
```

## PROPERTY STATS: `GET : http://localhost:5555/api/admin/dashboard/property-stats`
## LEAD PIPELINE: `GET : http://localhost:5555/api/admin/dashboard/lead-pipeline`
## INQUIRY STATS: `GET : http://localhost:5555/api/admin/dashboard/inquiry-stats?period=30`
## REVENUE: `GET : http://localhost:5555/api/admin/dashboard/revenue-analytics`
## USER GROWTH: `GET : http://localhost:5555/api/admin/dashboard/user-growth?period=30`
## TOP PROPERTIES: `GET : http://localhost:5555/api/admin/dashboard/top-properties?metric=views`
## CITY HEATMAP: `GET : http://localhost:5555/api/admin/dashboard/city-heatmap`
## RECENT ACTIVITY: `GET : http://localhost:5555/api/admin/dashboard/recent-activity`
## PROPERTY ANALYTICS: `GET : http://localhost:5555/api/admin/dashboard/property/1`
## AGENT PERFORMANCE: `GET : http://localhost:5555/api/admin/dashboard/agent-performance`

## GENERATE REPORT
```
POST : http://localhost:5555/api/admin/dashboard/reports/generate
Authorization: Bearer <adminToken>
```
input:
```json
{ "report_type": "properties", "format": "json" }
```

---

# MODULE 26: ADMIN â€” AUDIT & SECURITY

## AUDIT LOGS: `GET : http://localhost:5555/api/admin/audit/logs?entity_type=properties&action_type=CREATE`
## ACTIVITY LOGS: `GET : http://localhost:5555/api/admin/audit/activity?severity=Critical`
## LOGIN HISTORY: `GET : http://localhost:5555/api/admin/audit/login-history?status=Failed`
## FAILED LOGINS: `GET : http://localhost:5555/api/admin/audit/security/failed-logins`
## SUSPICIOUS: `GET : http://localhost:5555/api/admin/audit/security/suspicious`

---

# API COUNT SUMMARY

| Category | APIs |
|----------|------|
| Auth | 10 |
| User Profile | 8 |
| Properties | 12 |
| Reviews | 6 |
| Favorites & Comparisons | 8 |
| Inquiries & Contact | 8 |
| Property Requests | 8 |
| Saved Searches | 5 |
| Blog | 8 |
| Testimonials | 6 |
| Notifications | 5 |
| Analytics | 4 |
| Tags | 3 |
| Admin Users | 8 |
| Admin Properties | 14 |
| Admin Pricing | 6 |
| Admin Media | 4 |
| Admin Milestones | 4 |
| Admin Leads | 10 |
| Admin Requests | 8 |
| Admin Blog | 10 |
| Admin Content | 12 |
| Admin Notifications | 6 |
| Admin Masters | 7 |
| Admin Dashboard | 12 |
| Admin Audit | 5 |
| **TOTAL** | **~197** |
