// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient, gql } from "graphql-request";

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN

export default async function comments(req,res){

  if(req.method !== 'POST'){
    console.log('req')
    res.status(405).send({message: req.body})
    return
  }

    console.error(GraphQLClient, gql,res);
    const graphQLClient = new GraphQLClient(graphqlApi, {
      headers:{
        authorization: `Bearer ${graphcmsToken}`,
      },
    })
  
    const query = gql`
      mutation CreateComment($name: String!, $comment: String!, $slug: String!){
        createComment(data: {name: $name, comment: $comment, post: { connect: { slug: $slug}}}) {id}
      }
    `

    const commentContent = {"name": `${req.body.name}`, "comment": `${req.body.text}`, "slug": `${req.body.slug}`}

  
    const result = await graphQLClient.request(query, commentContent)
  
    return res.status(200).send(result);
}
