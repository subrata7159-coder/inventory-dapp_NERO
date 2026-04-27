import { ethers } from "ethers";

// Replace with deployed contract address on Nero Testnet or Localhost
export const CONTRACT_ADDRESS = "0x7b0f413A4011712294229b8F386f1b1d009D5cE2"; 

const ABI = [
    "function addProduct(string _id, string _name, string _sku, uint256 _quantity, uint256 _unitPrice, string _category)",
    "function updateStock(string _id, uint256 _quantityChange, bool _isAddition)",
    "function updatePrice(string _id, uint256 _newPrice)",
    "function discontinueProduct(string _id)",
    "function getProduct(string _id) view returns (tuple(string id, address owner, string name, string sku, uint256 quantity, uint256 unitPrice, string category, bool isActive))",
    "function listProducts() view returns (tuple(string id, address owner, string name, string sku, uint256 quantity, uint256 unitPrice, string category, bool isActive)[])",
    "function getLowStock(uint256 _threshold) view returns (tuple(string id, address owner, string name, string sku, uint256 quantity, uint256 unitPrice, string category, bool isActive)[])",
    "function getTotalValue() view returns (uint256)"
];

const NERO_CHAIN_ID = "0x2b1";

const switchToNeroNetwork = async () => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: NERO_CHAIN_ID }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: NERO_CHAIN_ID,
                            chainName: 'Nero Testnet',
                            rpcUrls: ['https://rpc-testnet.nerochain.io'],
                            nativeCurrency: {
                                name: 'Nero',
                                symbol: 'NERO',
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://testnet.neroscan.io']
                        }
                    ],
                });
            } catch (addError) {
                throw new Error("Failed to add Nero Testnet to MetaMask.");
            }
        } else {
            throw new Error("Please switch to the Nero Testnet in MetaMask.");
        }
    }
};

export const checkConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                return { publicKey: accounts[0] };
            }
        } catch (error) {
            console.error("Error checking connection:", error);
        }
    }
    return null;
};

export const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
        try {
            await switchToNeroNetwork();
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            return { publicKey: accounts[0] };
        } catch (error) {
            throw new Error(error.message || "Failed to connect MetaMask");
        }
    } else {
        throw new Error("MetaMask is not installed");
    }
};

const getContract = async (withSigner = false) => {
    if (typeof window.ethereum === "undefined") throw new Error("MetaMask is required");
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    if (withSigner) {
        const signer = await provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    } else {
        return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    }
};

export const addProduct = async (payload) => {
    if (!payload?.id) throw new Error("id is required");
    const contract = await getContract(true);
    const tx = await contract.addProduct(
        payload.id,
        payload.name || "",
        payload.sku || "",
        payload.quantity || 0,
        payload.unitPrice || 0,
        payload.category || "general"
    );
    return await tx.wait();
};

export const updateStock = async (payload) => {
    if (!payload?.id) throw new Error("id is required");
    const contract = await getContract(true);
    const tx = await contract.updateStock(payload.id, payload.quantityChange, payload.isAddition);
    return await tx.wait();
};

export const updatePrice = async (payload) => {
    if (!payload?.id) throw new Error("id is required");
    const contract = await getContract(true);
    const tx = await contract.updatePrice(payload.id, payload.newPrice);
    return await tx.wait();
};

export const discontinueProduct = async (payload) => {
    if (!payload?.id) throw new Error("id is required");
    const contract = await getContract(true);
    const tx = await contract.discontinueProduct(payload.id);
    return await tx.wait();
};

// Formatting helpers
const formatProduct = (p) => ({
    id: p.id,
    owner: p.owner,
    name: p.name,
    sku: p.sku,
    quantity: Number(p.quantity),
    unitPrice: Number(p.unitPrice),
    category: p.category,
    isActive: p.isActive
});

export const getProduct = async (id) => {
    if (!id) throw new Error("id is required");
    const contract = await getContract(false);
    const product = await contract.getProduct(id);
    return formatProduct(product);
};

export const listProducts = async () => {
    const contract = await getContract(false);
    const products = await contract.listProducts();
    return products.map(formatProduct);
};

export const getLowStock = async (threshold) => {
    const contract = await getContract(false);
    const products = await contract.getLowStock(threshold);
    return products.map(formatProduct);
};

export const getTotalValue = async () => {
    const contract = await getContract(false);
    const value = await contract.getTotalValue();
    return Number(value);
};
