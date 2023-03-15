import { graphql } from 'graphql';
import { request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async (slug) =>{
  const query = gql`
  query GetPost($slug: String!) {
    post(where: {slug: $slug}) {
      author {
        bio
        id
        name
        photo {
          url
        }
      }
      createdAt
      slug
      title
      content{
        raw
      }
      featureImage {
        url
      }
      excerpt
      category {
        title
        slug
      }
      comments {
        name
        comment
      }
    }
  }
  `

  const result = await request(graphqlAPI, query, {slug})

  return result.post;
}

export const getAllPosts = async () =>{
  const query = gql`
  query GetAllPosts() {
      postsConnection() {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            excerpt
            title
            featureImage {
              url
            }
            category {
              title
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges;
}

export const getFilteredPosts = async (slug) =>{
    const query = gql`
    query GetPosts($slug: String!) {
        postsConnection(where: {category: {slug: $slug}}) {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              excerpt
              title
              featureImage {
                url
              }
              category {
                title
                slug
              }
            }
          }
        }
      }
    `

    const result = await request(graphqlAPI, query, {slug})

    return result.postsConnection.edges;
}

export const getRecentPosts = async () =>{
  const query = gql`
    query GetPostDetails(){
      posts(orderBy: createdAt_ASC
      last: 3  
      ) {
        title
        featureImage{
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.posts;
}

export const getSimilarPosts = async () =>{
  const query = gql`
  query GetPostDetails($slug: String!, $category: String!){
    posts(
      where: [slug_not: $slug, AND: { category_some: { slug_in: $category}}]
      last: 3
    ) {
      title
      featureImage{
        url
      }
      createdAt
      slug
    }
  } 
  `
  const result = await request(graphqlAPI, query)

  return result.posts;
}

export const getStageCategories = async () =>{
  const query = gql`
  query Assets {
    categoriesConnection {
      edges {
        node {
          title
          slug
          photo {
            url
          }
        }
      }
    }
  }
  `
  const result = await request(graphqlAPI, query)
  return result.categoriesConnection.edges;
}

export const subComment = async (obj) => {
  const result = await fetch('/api/comments')
  return result.json();
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(obj),
  })
  console.log(await result.json());
  return result;
}