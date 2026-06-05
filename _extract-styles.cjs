const https = require('https');
https.get('https://cdn.prod.website-files.com/692aec67c7d6e6d4d43c5d3c/css/nikola-portfolio-site-b18cd7.webflow.shared.00f2aef73.css', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const classes = [
      'navbar-logo-left-container', 'navbar-wrapper-3', 'nav-link-4', 'nav-menu-two-2',
      'c2a-button', 'text-block-5', 'btn-icon', 'div-block-50', 'div-block-53',
      'image-28', 'list-item-14', 'div-block-47',
      'section', 'container-main', 'hero-heading-h1', 'para-txt',
      'button', 'text-block-6', 'arrow-div', 'arrow-img', 'getstarted-btn', 'grid-21',
      'italic-span', 'shadow-three',
      'home-about-section', 'container-4', 'crafting-bedge-section',
      'heading-txt', 'bedges-wrapper', 'creativity-bedge', 'innovation-bedge', 'strategy-bedge',
      'creativity-txt', 'innovation-txt', 'strategy-txt',
      'creativity-img', 'innovation-img', 'strategy-img',
      'crafting-heading', 'count-block', 'count-div-wrapper', 'count-div',
      'count', 'plus', 'descp', 'count-sec-divider', 'div-block-190',
      'div-block-194', 'div-block-195',
      'home-our-work-section', 'container-6', 'our-work-heading',
      'card-wrapper1', 'card-wrapper-2', 'card-1', 'card-2', 'card-3', 'card-4',
      'small-card', 'div-block-196', 'div-block-197', 'div-block-198',
      'avatar', 'heading-7', 'chips', 'link-block-2', 'image-30',
      'heading-div', 'div-block-214', 'div-block-215', 'span-italic-txt',
      'home-our-team-sec', 'container-7', 'ourteam-heading-div',
      'creative-mind-heading', 'creative-mind-wrapper', 'profile-card',
      'me_image', 'creative-descp-block', 'creative-block-title',
      'position-txt', 'social-link-div', 'lblock-linkedin', 'lblock-behance',
      'linkedin-icon', 'behance-icon', 'text-span-14',
      'section-6', 'container-8', 'grid-9', 'testimonial-heading-h2',
      'testimonial_greed', 'testimonial_grid1', 'testimonial-card',
      'testimonial_card4', 'about-card-5', 'text-block-20',
      'heading-15', 'heading-16', 'text-block-21', 'div-block-32', 'text-span-15',
      'section-8', 'container-10', 'grid-16', 'heading-20',
      'div-block-41', 'accordian-item', 'accordion-toggle',
      'text-block-30', 'dropdown-list', 'text-span-9', 'accordian-icon',
      'home-achievement-sec', 'container-11', 'certifficates_wrapper',
      'achevement-heading-h2', 'swiper', 'swiper-wrapper', 'swiper-slide', 'swiper-img',
      'text-span-16',
      'home-solution-section', 'container-12', 'c2a-main', 'c2a-wrapper',
      'c2a-title', 'subtext', 'back-to-home-btn', 'view-portfolio-txt',
      'div-block-23', 'text-span-17',
      'footer', 'container-14', 'grid-19', 'footer-column-1',
      'footer-social-icon', 'footer-column-4', 'title',
      'text-block-32', 'div-block-42', 'flex-block-2',
      'list-5', 'list-item-9', 'navigation-link', 'nav-text',
      'mobile-menu-overlay', 'div-block-29', 'div-block-54',
      'div-block-51', 'div-block-49', 'paragraph-10',
      'wrapper-links', 'nav-link-mobile-tablet'
    ];

    classes.forEach(cls => {
      const escaped = cls.replace(/[-]/g, '\\-');
      const regex = new RegExp('\\.' + escaped + '\\s*\\{([^}]+)\\}', 'g');
      let match;
      while ((match = regex.exec(d)) !== null) {
        const styles = match[1].trim();
        if (styles.length > 0) {
          console.log('.' + cls + ' { ' + styles + ' }');
          console.log('');
        }
      }
    });
  });
});
