import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { css } from '@emotion/css';
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Link from 'next/link'
import { AccountContext } from './context.js'
import { contractAddress, ownerAddress } from '../config'
import Blog from '../../artifacts/contracts/Blog.sol/Blog.json' 



export default function Home(props) {
  const {posts} = props
  const account = useContext(AccountContext) 
  const router = useRouter()
  async function navigate(){
    router.push('/create-post')
  }
  return (
    <div>
      <div className={postList}>
        {
          posts.map((post, index)=>(
            <Link href={`/post/${post[2]}`} key={index}>
              <a>
                <div className={linkStyle}>
                  <p className={postTitle}>
                    {post[1]}
                  </p>
                  <div className={arrowContainer}>
                    <img src='/right-arrow.svg'
                    alt='Right Arrow'
                    className={smallArrow} />
                  </div>
                </div>
              </a>
            </Link>
          ))
        }
      </div>
      <div className={container}>
        {
          (account===ownerAddress) && posts && !posts.length && (
            <button className={buttonStyle} onClick={navigate}>
              Create Your First Post
            </button>
          )
        }t
      </div>
    </div>
  )
}


export async function getServerSideProps(){
  let provider;

  if(process.env.ENVIRONMENT === 'local'){
    provider = new ethers.providers.JsonRpcProvider() 
  } else if (process.env.ENVIRONMENT==='testnet'){
    provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/jpfANPBOHcCzYXjg0V2qQODkHxqzWOBk')
  }else{
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  }

  const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
  const data = await contract.fetchPosts()

  return{
    props:{
      posts: JSON.parse(JSON.stringify(data))
    }
  }
}



const arrowContainer = css`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-right: 20px;
`

const postTitle = css`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  margin: 0;
  padding: 20px;
`

const linkStyle = css`
  border: 1px solid #ddd;
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
`

const postList = css`
  width: 700px;
  margin: 0 auto;
  padding-top: 50px;  
`

const container = css`
  display: flex;
  justify-content: center;
`

const buttonStyle = css`
  margin-top: 100px;
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 44px;
  padding: 20px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`

const arrow = css`
  width: 35px;
  margin-left: 30px;
`

const smallArrow = css`
  width: 25px;
`
