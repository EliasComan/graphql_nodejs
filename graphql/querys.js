import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { commentsTypes, postType, userType } from "./types.js"

import { UserModel } from "../models/users.js"
import { comentModel } from "../models/comments.js"
import { postModel } from "../models/post.js"

export const users ={
    type: new GraphQLList(userType),
    async resolve (){
        const users = await UserModel.find()
        return users
    }
}

export const user = {
    type: userType,
    description:'Get a user by id',
    args:{
        id:{type:GraphQLID}
    },
    async resolve (_, args) {
        const user = await UserModel.findById(args.id)
        console.log(user)
        return user
    }
}

export const posts = {
    type:  new GraphQLList(postType),
    description:'Get all posts',
    async resolve (){
        const post = await postModel.find()
        return post
    }
}

export const post  = {
    type: postType,
    description:'Get post by id',
    args:{
        id:{type:GraphQLID}
    },
    async resolve (_, args){
        const post = await postModel.findById(args.id)
        return post
    }
}

export const comments= {
    type:new GraphQLList(commentsTypes),
    description:'Get all coments',
    async resolve(){
        const comments = await comentModel.find()
        return comments
    }
}
export const comment = {
    type: commentsTypes,
    description:'Get commenty by id',
    args:{
        id:{type:GraphQLID}
    },
    async resolve(_,{id}){
        const comment = await comentModel.findById(id)
        return comment
    }
}