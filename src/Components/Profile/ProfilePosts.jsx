import React from 'react'
import useGetUserPosts from '../../Hooks/useGetUserPosts'
import { Box, Flex, Grid, Skeleton, Text, VStack } from '@chakra-ui/react';
import ProfilePost from './ProfilePost';

const ProfilePosts = () => {

  const { isLoading, posts } = useGetUserPosts();
  const noPostFound = !isLoading && posts.length == 0;
  if (noPostFound) return <NoPostFound />;

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {             /* Skeleton */

        isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h='300px'>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))
      }

      {
        /*The _ parameter is a convention used to indicate that the value is not being used within the function body.
     It's a placeholder for a value that is ignored. */
      }

      {
        !isLoading && (
          <>
            {
              posts.map((post) => (
                <ProfilePost post={post} key={post.id} />
              ))}
          </>
        )}

    </Grid>
  )
}

export default ProfilePosts;

const NoPostFound = () => {
  return (
    <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}> No Post Found !!!</Text>
    </Flex>
  )
};