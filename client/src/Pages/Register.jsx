import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [inviteData, setInviteData] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setInviteData(decoded);
            } catch (err) {
                setError('Invalid or expired token: ' + err.message);
            }
        } else {
            setError('No token provided');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inviteData || !inviteData.email) {
            setError('Invalid or missing invitation data');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/accept-invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...inviteData,
                    name,
                    password,
                }),
            });

            const data = await response.json();
            console.log("data: ", data)

            if (response.ok) {
                alert('Account created successfully');
                navigate('/');
            } else {
                setError(data.error || 'Failed to create account');
            }
        } catch (err) {
            setError('Something went wrong: ' + err.message);
        }
    };

    if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
    if (!inviteData) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-[#f7f4f3] flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl mx-4 p-10 w-full max-w-lg">
                <h1 className="text-2xl montserrat font-bold text-center text-[#5b2333] mb-2">
                    Create Account
                </h1>
                <p className="text-center text-sm text-[#5b2333] mb-6">
                    Start managing tasks smarter - create your account now.
                </p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 openSans text-[#5b2333]">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Full Name"
                        required
                        className="w-full outline-none border-b-[0.1rem] border-[#5b2333] p-2 focus:ring-[#5b2333]"
                    />
                    <input
                        type="email"
                        readOnly
                        name="email"
                        value={inviteData.email}
                        placeholder="Email"
                        className="w-full cursor-not-allowed outline-none border-b-[0.1rem] border-[#5b2333] p-2 bg-gray-100"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                        className="w-full outline-none border-b-[0.1rem] border-[#5b2333] p-2 focus:ring-[#5b2333]"
                    />
                    <input
                        type="text"
                        name="organization"
                        readOnly
                        value={inviteData.organization}
                        className="w-full cursor-not-allowed outline-none border-b-[0.1rem] border-[#5b2333] p-2 bg-gray-100"
                    />
                    <input
                        type="text"
                        name="role"
                        readOnly
                        value={inviteData.role}
                        className="w-full cursor-not-allowed outline-none border-b-[0.1rem] border-[#5b2333] p-2 bg-gray-100"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#5b2333] text-[#f7f4f3] rounded-md py-2 hover:bg-[#894b5c] transition duration-150 cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;