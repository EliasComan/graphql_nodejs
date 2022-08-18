import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { addComent, createPost, deleteComment, deletePost, login, register, updateComment, updatePost } from './mutations.js'
import { comment, comments, post, posts, user, users } from './querys.js'

const rootType = new GraphQLObjectType({
    name:"root",
    description:'The root query type',
    fields:{
        users,
        user,
        posts,
        post,
        comments,
        comment,
        
    }
})

const mutationType = new GraphQLObjectType({
    name:'MutationType',
    description:'The root mutation type',
    fields:{
        register,
        login,
        createPost,
        updatePost, 
        deletePost,
        addComent,
        updateComment,
        deleteComment

    }
})
export const schema = new GraphQLSchema({
    query:rootType,
    mutation:mutationType
})

