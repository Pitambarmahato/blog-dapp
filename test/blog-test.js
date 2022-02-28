const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Blog", async ()=>{
    it("Should create a post", async ()=>{
        const Blog = await ethers.getContractFactory("Blog");
        const blog = await Blog.deploy("Blog Contract");
        await blog.deployed();
        await blog.createPost("My First Blog", "12345");
        const posts = await blog.fetchPosts();
        expect(posts[0].title).to.equal("My First Blog")
    });

    it("Should update a post", async () =>{
        const Blog = await ethers.getContractFactory("Blog");
        const blog = await Blog.deploy("Blog Contract");
        await blog.deployed();
        await blog.createPost("My Second Blog", "12345");
        await blog.updatePost(1, "My Updated Post", "12345", true);
        const posts = await blog.fetchPosts();
        expect(posts[0].title).to.equal("My Updated Post")
    });

    it("Should update contract name", async () =>{
        const Blog = await ethers.getContractFactory("Blog");
        const blog = await Blog.deploy("Blog Contract");
        const name = "Updated Contract";
        await blog.deployed();
        await blog.updateName(name);
        expect(await blog.name()).to.equal("Updated Contract");
    })
})