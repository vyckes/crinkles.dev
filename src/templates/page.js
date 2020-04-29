import React from 'react';
import { graphql } from 'gatsby';
import PageTemplate from '../components/PageTemplate';
import Layout from '../components/Layout';
import PageSwitcher from '../components/PageSwitcher';

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark: post } = data;
  let next, prev;

  if (pageContext.next)
    next = {
      link: pageContext.next.fields.slug,
      title: pageContext.next.frontmatter.title
    };

  if (pageContext.prev)
    prev = {
      link: pageContext.prev.fields.slug,
      title: pageContext.prev.frontmatter.title
    };

  const meta = {
    ...post.frontmatter,
    words: post.wordCount.words,
    url: `https://www.kevtiq.dev${data.markdownRemark.fields.slug}`
  };

  return (
    <Layout
      meta={{ ...post.frontmatter, slug: post.fields.slug }}
      footer={true}
      className="post">
      <PageTemplate meta={meta}>{post.html}</PageTemplate>
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query PageID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      wordCount {
        words
      }
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredImage
      }
    }
  }
`;