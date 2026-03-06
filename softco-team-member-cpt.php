<?php
/**
 * Plugin Name: SoftCo Team Member CPT
 * Description: Registers the Team Member custom post type for the headless Next.js frontend.
 * Version:     1.0.0
 * Author:      SoftCo
 *
 * INSTALL: Upload this file to /wp-content/plugins/softco-team-member-cpt.php
 *          then go to WP Admin → Plugins and activate "SoftCo Team Member CPT".
 *
 *          After activating, go to Settings → Permalinks and click Save
 *          (even without changes) to flush rewrite rules.
 *
 *          Then re-import team-member-import.xml via Tools → Import → WordPress.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ── 1. Register CPT ───────────────────────────────────────────────────────────

add_action( 'init', 'softco_register_team_member_cpt' );

function softco_register_team_member_cpt() {
    register_post_type( 'team_member', [
        'label'               => 'Team Members',
        'labels'              => [
            'name'               => 'Team Members',
            'singular_name'      => 'Team Member',
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New Team Member',
            'edit_item'          => 'Edit Team Member',
            'new_item'           => 'New Team Member',
            'view_item'          => 'View Team Member',
            'search_items'       => 'Search Team Members',
            'not_found'          => 'No team members found',
            'not_found_in_trash' => 'No team members found in Trash',
        ],
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'menu_icon'           => 'dashicons-groups',
        'supports'            => [ 'title', 'thumbnail', 'page-attributes' ],
        'has_archive'         => false,
        'rewrite'             => [ 'slug' => 'team' ],
        'show_in_rest'        => true,
        // WPGraphQL support (requires WPGraphQL plugin)
        'show_in_graphql'     => true,
        'graphql_single_name' => 'teamMember',
        'graphql_plural_name' => 'teamMembers',
    ] );
}

// ── 2. Register Department taxonomy ──────────────────────────────────────────

add_action( 'init', 'softco_register_team_department_taxonomy' );

function softco_register_team_department_taxonomy() {
    register_taxonomy( 'team_department', 'team_member', [
        'label'               => 'Departments',
        'labels'              => [
            'name'              => 'Departments',
            'singular_name'     => 'Department',
            'search_items'      => 'Search Departments',
            'all_items'         => 'All Departments',
            'edit_item'         => 'Edit Department',
            'update_item'       => 'Update Department',
            'add_new_item'      => 'Add New Department',
            'new_item_name'     => 'New Department Name',
            'menu_name'         => 'Departments',
        ],
        'hierarchical'        => true,   // category-style (not tag-style)
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_admin_column'   => true,
        'show_in_rest'        => true,
        'rewrite'             => [ 'slug' => 'team-department' ],
        // WPGraphQL support
        'show_in_graphql'     => true,
        'graphql_single_name' => 'teamDepartment',
        'graphql_plural_name' => 'teamDepartments',
    ] );
}

// ── 3. One-time ACF photo sync ────────────────────────────────────────────────
// After importing, visit: /wp-admin/?sync_team_photos=1 (as admin).
// The page will go blank/show a message — that's fine, the sync ran.
// Remove or comment out this block afterwards.

add_action( 'admin_init', 'softco_sync_team_photos' );

function softco_sync_team_photos() {
    if ( ! isset( $_GET['sync_team_photos'] ) || ! current_user_can( 'manage_options' ) ) {
        return;
    }

    $posts = get_posts( [
        'post_type'      => 'team_member',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'fields'         => 'ids',
    ] );

    $updated = 0;
    foreach ( $posts as $id ) {
        $thumb_id = get_post_thumbnail_id( $id );
        if ( $thumb_id && function_exists( 'update_field' ) ) {
            update_field( 'photo', $thumb_id, $id );
            $updated++;
        }
    }

    wp_die(
        '<h2>Team Member Photo Sync Complete</h2>' .
        '<p>Updated <strong>' . $updated . '</strong> of ' . count( $posts ) . ' team members.</p>' .
        '<p><a href="' . admin_url( 'edit.php?post_type=team_member' ) . '">View Team Members →</a></p>'
    );
}
