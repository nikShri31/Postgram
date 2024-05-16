import React from 'react'
import useUserProfileStore from '../../store/userProfileStore';
import { Avatar, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/timeAgo';
const Caption = ({ post }) => {
  const userProfile = useUserProfileStore(state => state.userProfile);
  return (
    <Flex gap={4}>
      {/*Avatar */}
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={'sm'} />
      </Link>

      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          {/*username */}
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={"bold"} fontSize={12}> {userProfile.username}</Text>
          </Link>

          {/*Caption */}
          <Text fontSize={14}> {post.caption}</Text>
        </Flex>
        
        {/* Time-ago */}
        <Text fontSize={12} color={"gray"}> {timeAgo(post.createdAt)}</Text>
      </Flex>
    </Flex>
  )
}

export default Caption;