import React from 'react';

const AdminSettings = () => {
    return (
        <>
            <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 class="text-2xl font-medium">Update Password</h1>
                {/* <p class="text-slate-500">Hi, Welcome back 👋</p> */}
                <form action="" class="my-10">
                    <div class="flex flex-col space-y-5">
                        <label for="password">
                            <p class="font-medium text-slate-700 pb-2">Old Password</p>
                            <input id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Old Password" />
                        </label>

                        <label for="password">
                            <p class="font-medium text-slate-700 pb-2">New Password</p>
                            <input id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="New Password" />
                        </label>

                        <label for="password">
                            <p class="font-medium text-slate-700 pb-2">Confirm password</p>
                            <input id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Confirm password" />
                        </label>

                        <button class="w-full py-3 font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg border-blue-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Update</span>
                        </button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminSettings;