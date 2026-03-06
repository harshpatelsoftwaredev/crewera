const mysql = require('mysql2/promise');
require('dotenv').config();

const setupDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
  });

  try {
    console.log('Creating database crewera_reality...');
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS crewera_reality`
    );
    console.log('✓ Database created: crewera_reality');

    // Switch to the database
    await connection.execute(`USE crewera_reality`);

    // ==================== USERS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        profile_picture VARCHAR(255),
        city VARCHAR(100),
        address TEXT,
        date_of_birth DATE,
        bio TEXT,
        email_verified BOOLEAN DEFAULT FALSE,
        email_verification_token VARCHAR(255),
        password_reset_token VARCHAR(255),
        password_reset_expires DATETIME,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (email),
        INDEX (role)
      )
    `);
    console.log('✓ Users table created');

    // ==================== PROPERTIES TABLE (CORE) ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS properties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE,
        team_name VARCHAR(255),
        project_name VARCHAR(255) NOT NULL,
        property_type ENUM('Residential', 'Commercial', 'Mixed') NOT NULL,
        builder_name VARCHAR(255) NOT NULL,
        project_start_date DATE,
        special_type ENUM('None', 'Pent House', 'Duplex', 'Triplex', 'Villa') DEFAULT 'None',
        total_units INT,
        available_units INT,
        construction_stage ENUM('Pre-Launch', 'Under Construction', 'Ready to Move') NOT NULL,
        status ENUM('Active', 'Inactive', 'Pending Approval') DEFAULT 'Pending Approval',
        description TEXT,
        view_count INT DEFAULT 0,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (property_type),
        INDEX (construction_stage),
        INDEX (status),
        INDEX (created_by),
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('✓ Properties table created');

    // ==================== PROPERTY_LOCATIONS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS property_locations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL UNIQUE,
        address TEXT NOT NULL,
        city VARCHAR(100),
        state VARCHAR(100),
        zip_code VARCHAR(20),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        area VARCHAR(100),
        landmarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (property_id),
        INDEX (city),
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Property Locations table created');

    // ==================== PROPERTY_AMENITIES TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS property_amenities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        amenity_name VARCHAR(100) NOT NULL,
        amenity_type VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (property_id),
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Property Amenities table created');

    // ==================== PROPERTY_PRICING TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS property_pricing (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        bhk_type VARCHAR(50) NOT NULL,
        tower VARCHAR(100),
        total_units INT NOT NULL,
        available_units INT NOT NULL,
        size_super_buildup DECIMAL(10,2),
        size_carpet DECIMAL(10,2),
        price DECIMAL(15,2) NOT NULL,
        price_per_sqft DECIMAL(10,2),
        revenue DECIMAL(15,2),
        roi DECIMAL(5,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (property_id),
        INDEX (bhk_type),
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Property Pricing table created');

    // ==================== UNIT_SPECIFICATIONS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS unit_specifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        bhk_type VARCHAR(50) NOT NULL,
        tower VARCHAR(100),
        front_dimension DECIMAL(10,2),
        back_dimension DECIMAL(10,2),
        right_dimension DECIMAL(10,2),
        left_dimension DECIMAL(10,2),
        facing ENUM('East', 'West', 'North', 'South'),
        special_feature VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (property_id),
        INDEX (bhk_type),
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Unit Specifications table created');

    // ==================== PROPERTY_CONTACTS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS property_contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        contact_type ENUM('Sales Head', 'Developer', 'Support') NOT NULL,
        name VARCHAR(255) NOT NULL,
        mobile VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        designation VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (property_id),
        INDEX (contact_type),
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Property Contacts table created');

    // ==================== PROPERTY_MEDIA TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS property_media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        media_type ENUM('Photo', '3D Render', 'Drone Video', 'Aerial Shoot', 'Sample House Tour', 'Floorplan', 'Document') NOT NULL,
        media_url VARCHAR(255) NOT NULL,
        file_type VARCHAR(50),
        display_order INT DEFAULT 0,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (property_id),
        INDEX (media_type),
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Property Media table created');

    // ==================== PROPERTY_REVIEWS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS property_reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        property_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review_text TEXT NOT NULL,
        is_verified_purchase BOOLEAN DEFAULT FALSE,
        helpful_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (user_id),
        INDEX (property_id),
        INDEX (rating),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Property Reviews table created');

    // ==================== PROPERTY_WEBSITE_PREFERENCES TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS property_website_preferences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL UNIQUE,
        legal_status VARCHAR(255),
        paper_ratio DECIMAL(5,2),
        social_class VARCHAR(100),
        storeys INT,
        basements INT,
        lifts INT,
        balconies INT,
        units_per_floor INT,
        allocated_parking INT,
        sample_house_available BOOLEAN DEFAULT FALSE,
        maintenance_cost DECIMAL(10,2),
        electricity_provider VARCHAR(255),
        electricity_billing ENUM('Monthly', 'Yearly') DEFAULT 'Monthly',
        gas_provider VARCHAR(255),
        water_supply_provider VARCHAR(255),
        possession_date DATE,
        price_negotiable BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (property_id),
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Property Website Preferences table created');

    // ==================== PROPERTY_LEADS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS property_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        property_id INT NOT NULL,
        lead_name VARCHAR(255) NOT NULL,
        lead_email VARCHAR(255) NOT NULL,
        lead_phone VARCHAR(20) NOT NULL,
        lead_type ENUM('Buyer', 'Investor', 'Tenant') DEFAULT 'Buyer',
        budget_min DECIMAL(15,2),
        budget_max DECIMAL(15,2),
        interested_bhk VARCHAR(50),
        message TEXT,
        lead_status ENUM('New', 'Contacted', 'Qualified', 'Negotiating', 'Lost') DEFAULT 'New',
        assigned_to INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (user_id),
        INDEX (property_id),
        INDEX (lead_status),
        INDEX (assigned_to),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('✓ Property Leads table created');

    // ==================== AUDIT_LOGS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        action_type ENUM('CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LOGIN', 'EXPORT') NOT NULL,
        entity_type VARCHAR(100) NOT NULL,
        entity_id INT,
        description TEXT,
        old_values JSON,
        new_values JSON,
        ip_address VARCHAR(45),
        user_agent VARCHAR(500),
        status ENUM('Success', 'Failed') DEFAULT 'Success',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (user_id),
        INDEX (action_type),
        INDEX (entity_type),
        INDEX (created_at),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('✓ Audit Logs table created');

    // ==================== AUDIT_ACTIVITY TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS audit_activity (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        activity_type VARCHAR(100) NOT NULL,
        activity_details TEXT,
        related_entity VARCHAR(100),
        related_entity_id INT,
        severity ENUM('Info', 'Warning', 'Critical') DEFAULT 'Info',
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (user_id),
        INDEX (activity_type),
        INDEX (created_at),
        INDEX (severity),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('✓ Audit Activity table created');

    // ==================== FAVORITES TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        property_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_favorite (user_id, property_id),
        INDEX (user_id),
        INDEX (property_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Favorites table created');

    // ==================== INQUIRIES TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        property_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        inquiry_type ENUM('Property Inquiry', 'General Inquiry') DEFAULT 'Property Inquiry',
        status ENUM('Pending', 'Viewed', 'Replied') DEFAULT 'Pending',
        admin_response TEXT,
        responded_by INT,
        responded_at DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (user_id),
        INDEX (property_id),
        INDEX (status),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        FOREIGN KEY (responded_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('✓ Inquiries table created');

    // ==================== PROPERTY_REQUESTS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS property_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        your_name VARCHAR(255) NOT NULL,
        your_email VARCHAR(255) NOT NULL,
        your_phone VARCHAR(20) NOT NULL,
        your_address TEXT NOT NULL,
        property_type ENUM('Residential', 'Commercial', 'Mixed') NOT NULL,
        property_location TEXT NOT NULL,
        property_landmarks TEXT,
        builder_developer_name VARCHAR(255),
        bhk_type VARCHAR(50),
        special_type ENUM('None', 'Pent House', 'Duplex', 'Triplex', 'Villa') DEFAULT 'None',
        approx_price DECIMAL(15,2),
        size_sqft DECIMAL(10,2),
        facing ENUM('East', 'West', 'North', 'South'),
        construction_stage ENUM('Pre-Launch', 'Under Construction', 'Ready to Move'),
        project_start_date DATE,
        possession_date DATE,
        request_reason TEXT,
        photos_path VARCHAR(255),
        video_url VARCHAR(255),
        brochure_path VARCHAR(255),
        status ENUM('Pending', 'Approved', 'Rejected', 'Listed') DEFAULT 'Pending',
        reviewed_by INT,
        reviewed_at DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (user_id),
        INDEX (status),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('✓ Property Requests table created');

    // ==================== BLOG_POSTS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        author_id INT NOT NULL,
        featured_image VARCHAR(255),
        excerpt TEXT,
        content LONGTEXT NOT NULL,
        category VARCHAR(100),
        is_featured BOOLEAN DEFAULT FALSE,
        view_count INT DEFAULT 0,
        status ENUM('Draft', 'Published', 'Archived') DEFAULT 'Draft',
        published_at DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (author_id),
        INDEX (slug),
        INDEX (status),
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Blog Posts table created');

    // ==================== BLOG_COMMENTS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blog_comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blog_post_id INT NOT NULL,
        user_id INT,
        commenter_name VARCHAR(255) NOT NULL,
        commenter_email VARCHAR(255) NOT NULL,
        comment_text TEXT NOT NULL,
        is_approved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (blog_post_id),
        INDEX (user_id),
        FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('✓ Blog Comments table created');

    // ==================== TESTIMONIALS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        user_name VARCHAR(255) NOT NULL,
        user_image VARCHAR(255),
        testimonial_text TEXT NOT NULL,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        is_featured BOOLEAN DEFAULT FALSE,
        status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (user_id),
        INDEX (status),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log('✓ Testimonials table created');

    // ==================== FAQS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS faqs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question VARCHAR(500) NOT NULL,
        answer LONGTEXT NOT NULL,
        category ENUM('General Questions', 'Property Listing', 'Buying Process', 'Account & Settings', 'Payment & Pricing') DEFAULT 'General Questions',
        display_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (category)
      )
    `);
    console.log('✓ FAQs table created');

    // ==================== CONTACT_MESSAGES TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        replied BOOLEAN DEFAULT FALSE,
        response TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (is_read)
      )
    `);
    console.log('✓ Contact Messages table created');

    // ==================== NOTIFICATIONS TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        notification_type ENUM('Property Update', 'Inquiry Response', 'Marketing Email', 'Newsletter') DEFAULT 'Property Update',
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (user_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Notifications table created');

    // ==================== USER_PREFERENCES TABLE ====================
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_preferences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNIQUE NOT NULL,
        property_updates BOOLEAN DEFAULT TRUE,
        inquiry_responses BOOLEAN DEFAULT TRUE,
        marketing_emails BOOLEAN DEFAULT FALSE,
        newsletter BOOLEAN DEFAULT TRUE,
        sms_notifications BOOLEAN DEFAULT FALSE,
        show_profile_publicly BOOLEAN DEFAULT FALSE,
        show_favorites BOOLEAN DEFAULT FALSE,
        allow_developer_contact BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (user_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ User Preferences table created');

    console.log('\n✅ All tables created successfully in crewera_reality database!');
    await connection.end();
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
};

setupDatabase();
