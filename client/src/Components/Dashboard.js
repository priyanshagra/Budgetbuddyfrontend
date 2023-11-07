import React from 'react'
import { useCookies } from 'react-cookie';
import { PaperClipIcon } from '@heroicons/react/20/solid'

const Dashboard = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const profileImageURL = cookies.pic;
    const name=cookies.name;
    const maxsalary=cookies. maxsalary;
    const minsalary=cookies.minsalary;
    const maxexpense=cookies.maxexpense;
    const minexpense=cookies.minexpense;
    console.log(profileImageURL)
  return (
    <div className="flex h-screen bg-gray-100">
    {/* Left Sidebar */}
    <div className="w-1/4 bg-gray-800 p-6">
      <div className="mb-4">
        <img
          src={profileImageURL}
          alt="Profile"
          className="rounded-full w-16 h-16 mx-auto"
        />
      </div>
      <ul className="text-white">
        <li className="mb-2">Dashboard</li>
        <li className="mb-2">Analytics</li>
        <li className="mb-2">Settings</li>
      </ul>
    </div>

    {/* Main Content */}
    <div className="w-3/4 p-6">
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">maxincome</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{maxsalary}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">minincome</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{minsalary}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">maxexpense</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{maxexpense}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">minexpense</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{minexpense}</dd>
          </div>
        </dl>
      </div>
    </div>
    </div>
  </div>
  )
}

export default Dashboard
