import { useState } from "react";
import { ethers } from "ethers";

type SignupProps = {
  onShowLogin?: () => void;
}

const contract_address = "0x3d192aAcEd1D8ca62CC0409be96139Bf4F6Dc8Ea";
const contract_abi = [
	{
		"inputs": [],
		"name": "activate_user",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_data",
				"type": "string"
			}
		],
		"name": "add_fir",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_destination",
				"type": "string"
			}
		],
		"name": "add_travel_logs",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_adharID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_travelldestination",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deactivate_user",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "fir_added",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_dest",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "travel_log_added",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "uniqueID",
				"type": "bytes32"
			}
		],
		"name": "user_activated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "adharID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "uniqueID",
				"type": "bytes32"
			}
		],
		"name": "user_created",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "uniqueID",
				"type": "bytes32"
			}
		],
		"name": "user_deactivated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "firs",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "userId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "get_fir",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "userId",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "data",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"internalType": "struct SIH_PROJECT.FIR",
				"name": "fir",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "get_user_travel_logs",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "_place",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_time",
						"type": "uint256"
					}
				],
				"internalType": "struct SIH_PROJECT.TRAVEL_LOG[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "police",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "user_exist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "adharID",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "uniqueID",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const Signup = ({ onShowLogin }: SignupProps) => {
  const [string, setString] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    aadhaar: "",
    age: "",
    gender: "",
    password: "",
    confirm: ""
  });
  const [error, setError] = useState("");

  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");

const connectWallet = async () => {
  try {
    if (!(window as any).ethereum) {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    // const provider2 = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
    
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contract_address, contract_abi, signer);

    // Request account access
    
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    const chainId = await (window as any).ethereum.request({
      method: "eth_chainId",
    });
    const chainNumber = parseInt(chainId, 16);

    const hashedString = await contract.createUser(parseInt(form.aadhaar), "Lovely professional university");
    setString(hashedString);
    console.log("This is the string ",hashedString);

    // Save first account to state
    setProvider(provider as any);
    setAccount(accounts[0]);
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.phone || !form.aadhaar || !form.age || !form.gender || !form.password || !form.confirm) {
      setError("Please fill all fields.");
      return false;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number must be 10 digits.");
      return false;
    }
    if (!/^\d{12}$/.test(form.aadhaar)) {
      setError("Aadhaar must be 12 digits.");
      return false;
    }
    if (!/^[0-9]{1,3}$/.test(form.age) || Number(form.age) <= 0) {
      setError("Please enter a valid age.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Signup data", form);
    connectWallet();
    // TODO: call signup API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-md p-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded-md p-2" placeholder="10 digits" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Aadhaar</label>
              <input name="aadhaar" value={form.aadhaar} onChange={handleChange} className="w-full border rounded-md p-2" placeholder="12 digits" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input name="age" value={form.age} onChange={handleChange} className="w-full border rounded-md p-2" type="number" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded-md p-2">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input name="password" value={form.password} onChange={handleChange} type="password" className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm password</label>
            <input name="confirm" value={form.confirm} onChange={handleChange} type="password" className="w-full border rounded-md p-2" />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button className="w-full bg-black text-white rounded-md py-2 font-medium">Create account</button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <button onClick={() => onShowLogin?.()} className="text-blue-600 underline">Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Signup;
