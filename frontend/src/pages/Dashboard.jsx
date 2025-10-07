import Layout from "../layouts/Layout";

function Dashboard() {
    return (
        <Layout>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back 👋</h2>
            <p className="mt-2 text-gray-600">
                Dashboard admin ini cuyyy 🤙
            </p>

            {/* Dummy cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Total Area</h3>
                    <p className="text-2xl text-blue-600 font-bold mt-2">6</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Total Task</h3>
                    <p className="text-2xl text-blue-600 font-bold mt-2">34</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Task Completed</h3>
                    <p className="text-2xl text-blue-600 font-bold mt-2">20</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Feedback</h3>
                    <p className="text-2xl text-blue-600 font-bold mt-2">87</p>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;
