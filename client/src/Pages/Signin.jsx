import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import { getUserFromDB, saveUserIfNotExists } from '../utils/indexedDB';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "Member"
    });
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                const fullUser = { ...data.user, email: formData.email };
    
                const existingUser = await getUserFromDB();
                
                if (!existingUser || existingUser.id !== fullUser.id) {
                    setUser(fullUser);
                    await saveUserIfNotExists(fullUser);
                }
    
                switch (formData.role) {
                    case "Admin":
                        navigate("/admin/dashboard");
                        break;
                    case "Manager":
                        navigate("/manager/dashboard");
                        break;
                    case "Member":
                        navigate("/dashboard");
                        break;
                    default:
                        alert("Invalid role selected.");
                }
            } else {
                console.error(data.message);
                alert("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f4f3] flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl mx-4 p-10 w-full max-w-lg">
                <h1 className="text-2xl montserrat font-bold text-center text-[#5b2333] mb-2">
                    Sign In To Your Workspace
                </h1>
                <p className="text-center text-sm text-[#5b2333] mb-6">Glad to see you again. Let's work.</p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 openSans text-[#5b2333]">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required className="w-full outline-none border-b-[0.1rem] border-[#5b2333] p-2 focus:ring-[#5b2333]" />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required className="w-full outline-none border-b-[0.1rem] border-[#5b2333] p-2 focus:ring-[#5b2333]" />
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full outline-none border-b-[0.1rem] border-[#5b2333] p-2 focus:ring-[#5b2333] cursor-pointer">
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Member">Member</option>
                    </select>
                    <button type="submit" className="w-full bg-[#5b2333] text-[#f7f4f3] rounded-md py-2 hover:bg-[#894b5c] transition duration-150 cursor-pointer">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Signin;