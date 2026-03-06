<?php
/**
 * Team Member CPT Migration Script
 *
 * Imports 15 team members from the old SoftCo site into the `team_member` CPT.
 * Stores existing image URLs as ACF `photo` field values (external URLs).
 *
 * USAGE (two options):
 *
 * Option A — WP-CLI (recommended):
 *   wp eval-file team-member-migration.php --url=https://your-wordpress-site.com
 *
 * Option B — One-time admin page load:
 *   Place this file in your theme or a mu-plugins file and visit the URL once,
 *   then remove it immediately after.
 *
 * REQUIREMENTS:
 *   - The `team_member` CPT must be registered in WordPress before running.
 *   - Advanced Custom Fields (ACF) must be active.
 *   - The field group `group_team_member_fields` must be imported first
 *     (import `acf-export-team-member-cpt.json` via ACF → Tools → Import).
 *
 * CPT REGISTRATION (add to your theme's functions.php or a plugin):
 *
 *   add_action('init', function() {
 *     register_post_type('team_member', [
 *       'label'               => 'Team Members',
 *       'public'              => true,
 *       'show_in_graphql'     => true,
 *       'graphql_single_name' => 'teamMember',
 *       'graphql_plural_name' => 'teamMembers',
 *       'supports'            => ['title', 'thumbnail'],
 *       'menu_icon'           => 'dashicons-groups',
 *       'has_archive'         => false,
 *     ]);
 *   });
 */

// Guard: only run from WP-CLI or when explicitly triggered.
if ( ! ( defined('WP_CLI') && WP_CLI ) && ! ( isset($_GET['run_migration']) && current_user_can('manage_options') ) ) {
    die('Run via WP-CLI: wp eval-file team-member-migration.php');
}

$team_members = [
    [
        'name'         => 'Anton Scott',
        'job_title'    => 'CEO',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2022/03/Anton-BW-682x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/anton-scott-3338a02/',
        'order'        => 1,
        'bio'          => '',
    ],
    [
        'name'         => 'Robert Hickey',
        'job_title'    => 'Chief Knowledge Officer',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2022/03/Robert-BW-683x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/robert-hickey-263788/',
        'order'        => 2,
        'bio'          => '',
    ],
    [
        'name'         => 'Peter Brougham',
        'job_title'    => 'Head of Sales',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2025/03/Peter-Brougham-headshot-photo-bw-v5-661x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/peterbrougham/',
        'order'        => 3,
        'bio'          => '',
    ],
    [
        'name'         => 'Martin Doran',
        'job_title'    => 'Chief Financial Officer',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2024/11/Martin-Doran-2-683x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/martin-doran/',
        'order'        => 4,
        'bio'          => '',
    ],
    [
        'name'         => 'Ann-Marie Ramsay',
        'job_title'    => 'Head of Operations',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2023/12/Ann-Marie_2-682x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/ann-marie-ramsay-irl/',
        'order'        => 5,
        'bio'          => '',
    ],
    [
        'name'         => 'Freda Donnelly',
        'job_title'    => 'HR Manager',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2022/07/Freda-BW-682x1024.png',
        'linkedin_url' => 'https://www.linkedin.com/in/freda-donnelly-82b4b22a/',
        'order'        => 6,
        'bio'          => '',
    ],
    [
        'name'         => 'Killian McCarthy',
        'job_title'    => 'VP Sales Europe',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2022/03/Killian-BW-682x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/killian-mccarthy-819b176/',
        'order'        => 7,
        'bio'          => '',
    ],
    [
        'name'         => 'Neil Kelly',
        'job_title'    => 'VP Products',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2022/03/Neil-BW-682x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/neil-thomas-kelly/',
        'order'        => 8,
        'bio'          => '',
    ],
    [
        'name'         => 'Garret Pearse',
        'job_title'    => 'SVP Pre-Sales',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2024/02/Garret-BW-683x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/garret-pearse-a12495b/',
        'order'        => 9,
        'bio'          => '',
    ],
    [
        'name'         => 'Harri Salmela',
        'job_title'    => 'VP R&D',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2022/03/Harri-BW-683x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/harri-salmela-6947a231/',
        'order'        => 10,
        'bio'          => '',
    ],
    [
        'name'         => 'Adam McDonagh',
        'job_title'    => 'VP Sales North America',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2022/03/Adam-BW-682x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/adammcdonagh/',
        'order'        => 11,
        'bio'          => '',
    ],
    [
        'name'         => 'Aoife Ryan',
        'job_title'    => 'Customer Services Mgr',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2022/07/Aoife-BW-2-682x1024.png',
        'linkedin_url' => 'https://www.linkedin.com/in/aoife-ryan-917b8a33/',
        'order'        => 12,
        'bio'          => '',
    ],
    [
        'name'         => 'Daniel Carroll',
        'job_title'    => 'VP Finance',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2022/07/Daniel-BW-682x1024.png',
        'linkedin_url' => 'https://www.linkedin.com/in/daniel-carroll-255147108/',
        'order'        => 13,
        'bio'          => '',
    ],
    [
        'name'         => 'Andrew Martin',
        'job_title'    => 'Customer Optimisation',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2024/03/Andrew-Martin.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/andrewjpmartin/',
        'order'        => 14,
        'bio'          => '',
    ],
    [
        'name'         => 'Matthew Jefferson',
        'job_title'    => 'Customer Onboarding Mgr',
        'photo_url'    => 'https://softco.com/wp-content/uploads/2024/03/mattnew-682x1024.jpg',
        'linkedin_url' => 'https://www.linkedin.com/in/mattjefferson1/',
        'order'        => 15,
        'bio'          => '',
    ],
];

$created = 0;
$skipped = 0;

foreach ( $team_members as $member ) {
    // Skip if a post with this title already exists to allow safe re-runs.
    $existing = get_posts([
        'post_type'      => 'team_member',
        'title'          => $member['name'],
        'post_status'    => 'publish',
        'posts_per_page' => 1,
        'fields'         => 'ids',
    ]);

    if ( ! empty( $existing ) ) {
        WP_CLI::log( "Skipping (already exists): {$member['name']}" );
        $skipped++;
        continue;
    }

    $post_id = wp_insert_post([
        'post_type'   => 'team_member',
        'post_title'  => $member['name'],
        'post_status' => 'publish',
        'menu_order'  => $member['order'],
    ]);

    if ( is_wp_error( $post_id ) ) {
        WP_CLI::warning( "Failed to create: {$member['name']} — " . $post_id->get_error_message() );
        continue;
    }

    // ACF fields — update_field() uses the ACF field name (snake_case).
    update_field( 'job_title',     $member['job_title'],    $post_id );
    update_field( 'linkedin_url',  $member['linkedin_url'], $post_id );
    update_field( 'display_order', $member['order'],        $post_id );

    if ( ! empty( $member['bio'] ) ) {
        update_field( 'bio', $member['bio'], $post_id );
    }

    // For the photo field: sideload the image from the old site into the WP
    // media library and attach it to the post, then store the attachment ID
    // in the ACF image field (ACF image fields expect an attachment ID).
    if ( ! empty( $member['photo_url'] ) ) {
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';

        $attachment_id = media_sideload_image( $member['photo_url'], $post_id, $member['name'], 'id' );

        if ( is_wp_error( $attachment_id ) ) {
            WP_CLI::warning( "  Photo sideload failed for {$member['name']}: " . $attachment_id->get_error_message() );
        } else {
            // Set as featured image and store in ACF photo field.
            set_post_thumbnail( $post_id, $attachment_id );
            update_field( 'photo', $attachment_id, $post_id );
            WP_CLI::log( "  ✓ Photo sideloaded (attachment #{$attachment_id})" );
        }
    }

    WP_CLI::success( "Created: {$member['name']} (post #{$post_id})" );
    $created++;
}

WP_CLI::log( "---" );
WP_CLI::log( "Done. Created: {$created} | Skipped (already exist): {$skipped}" );
