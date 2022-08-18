import {GraphQLID, GraphQLString} from 'graphql'
import { commentsTypes, postType } from './types.js'

import { UserModel } from '../models/users.js'
import { comentModel } from '../models/comments.js'
import { createJWT } from '../utils/auth.js'
import { postModel } from '../models/post.js'

export const register = {
    type: GraphQLString,
    desription:'Register new user and return a token',
    args:{
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        displayName:{type:GraphQLString},
    }
    ,
    async resolve (_,args,) {
        const {username, email, password, displayName} = args
       const user = new UserModel.create({
          username,
          email,
          password,
          displayName 
        })
       const {id} = user
        const token = createJWT({username, email, displayName, id})
            return token
    }
}

export const login =  {
    type:GraphQLString,
    description:'Login user and return a token',
    args:{
        email:{type:GraphQLString},
        password:{type:GraphQLString}
    },
    async resolve (_, args ) {
        console.log(args)
        const user = await UserModel.findOne({email:args.email})
        if(!user || args.password !== user.password) throw new Error('Email o constraseña erroneos')
        const {username, email, displayname, id} = user
        const token = createJWT({username, email, displayname, id})
        return token
    }
}

export const createPost = {
    type:postType,
    description:'Create new post',
    args:{
        title:{type:GraphQLString},
        body:{type: GraphQLString}
    },
    async resolve (_, args,  {verifiedUser}){
        const newPost = new postModel({
            title: args.title,
            body: args.body,
            autorID:verifiedUser.id
        })
        await newPost.save()
        return newPost
    }
}

export const updatePost = {
    type: postType,
    description:'Update a post',
    args:{
        id:{type: GraphQLID},
        title:{type:GraphQLString},
        body:{type:GraphQLString}
    },
    async resolve (_, {id, title,body}, {verifiedUser}) {
        if (!verifiedUser) throw new Error('Unauthorized')
        const updatedPost = await 
        postModel.findOneAndUpdate(
            {_id:id},
            {
            title,
            body,
            },
            {
             new:true
            })

        return updatedPost
    }   
}

export const deletePost = {
    type: GraphQLString,
    description:'Delete a post',
    args:{
        PostId:{type:GraphQLID}
    },
    async resolve (_, {PostId}, {verifiedUser}){
        if (!verifiedUser) throw new Error('Unauthorized')
       const postDeleted = await postModel.findByIdAndDelete({_id: PostId})
       if (!postDeleted) throw new Error('Post not found')
       return 'Post Deleted'
    }
}

export const addComent = {
    type: commentsTypes,
    description:'Add a comment to a post',
    args:{
        PostID:{type:GraphQLID},
        comment:{type:GraphQLString}
    },
    async resolve ( _,{PostID, comment}, {verifiedUser}){ 
        if (!verifiedUser) throw new Error('Unauthorized')
        const newComment = new comentModel({
            comment:comment,
            PostID:PostID,
            userID:verifiedUser.id
        })
        await newComment.save()
        return newComment
    }
}

export const updateComment = {
    type:commentsTypes,
    description:'Update a comment',
    args:{
        id:{type:GraphQLID},
        comment:{ type:GraphQLString}
    },
    async resolve (_, {id, comment}, {verifiedUser}){
        if (!verifiedUser) throw new Error('Unauthorized')
        const updatedComment = await comentModel.findByIdAndUpdate(id,
            {
            comment:comment
            },
            {
                new:true
            })
            return updatedComment
    }
}

export const deleteComment = {
    type: GraphQLString,
    description:'Delelete a comment',
    args:{
        id:{type:GraphQLID}
    },
    async resolve (_, {id},{verifiedUser}){
        if (!verifiedUser) throw new Error('Unauthorized')
        const deleted = await comentModel.findByIdAndDelete(id)
        if(!deleted) throw new Error('Comment not found')
        return 'Done'
    }
}