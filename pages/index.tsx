import axios from 'axios'
import { log } from 'console'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NoResults from '../components/NoResults'
import VideoCard from '../components/VideoCard'

import { Video } from '../types'

interface IProps {
  videos: Video[];
}


const Home= ({ videos }: IProps) => {
  ;
  
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length 
        ? videos?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        )) 
        : <NoResults text={`No Videos`} />}
    </div>
  )
}

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`http://localhost:3000/api/post`);

console.log('----->',response);

  if(topic) {
    response = await axios.get(`http://localhost:3000/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};
