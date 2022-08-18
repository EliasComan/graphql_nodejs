import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from 'graphql'

import { UserModel } from '../models/users.js'
import { comentModel } from '../models/comments.js';
import { postModel } from '../models/post.js'

export const userType= new GraphQLObjectType({
   name:'Usertype',
   description:'The user type',
    fields:{
    id:{type: GraphQLID},
    username:{type:GraphQLString},
    email:{type:GraphQLString},
    displayName:{type:GraphQLString}
   }
})

export const postType = new GraphQLObjectType({
   name: "Post",
   description: "Post Type",
   fields: () => ({
     id: { type: GraphQLID },
     title: { type: GraphQLString },
     body: { type: GraphQLString },
     autor: {
       type: userType,
       resolve(parent) {
         return UserModel.findById(parent.autorID);
       },
     },
     comments: {
       type: new GraphQLList(commentsTypes),
       resolve(parent) {
         return comentModel.find({ PostID: parent.id });
       },
     },
   }),
 });
export const commentsTypes = new GraphQLObjectType({
   name: "Comment",
   description: "comments type",
   fields: () => ({
     id: { type: GraphQLID },
     comment: { type: GraphQLString },
     user: {
       type: userType,
       resolve(parent) {
         return UserModel.findById(parent.userID);
       },
     },
     post: {
       type: postType,
       resolve(parent) {
         return postModel.findById(parent.PostID);
       },
     },
   }),
 });