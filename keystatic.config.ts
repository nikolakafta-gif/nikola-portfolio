import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Nikola Portfolio' },
  },
  collections: {
    posts: collection({
      label: 'Case Studies',
      slugField: 'title',
      path: 'src/content/posts/*/',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        publishedDate: fields.date({ label: 'Published on' }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'public/assets/images/posts',
          publicPath: '/assets/images/posts/',
        }),
        client: fields.text({ label: 'Client name' }),
        industry: fields.text({ label: 'Industry' }),
        services: fields.text({ label: 'Services provided' }),
        liveUrl: fields.url({ label: 'Live site URL' }),
        duration: fields.text({ label: 'Project duration' }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
