// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient, gql } from "graphql-request";

console.log(GraphQLClient, gql);

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN

export default async function comments(req,res){
  const {name,comment} = req.body
  const graphQLClient = new GraphQLClient(graphqlApi, {
    headers:{
      authorization: `Bearer ${graphcmsToken}`
    }
  })

  const query = gql`
    mutation CreateComment($name: String!, $comment: String!){
      createComment(data: {name: $name, comment: $comment, post: {connect: {slug: $slug}}}) {id}
    }
  `

  const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result);
}
