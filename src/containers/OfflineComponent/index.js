import React, { useEffect, useState } from 'react'
import { toastr } from 'react-redux-toastr'

/**
 * A component that displays a message when the user is offline.
 *
 * @param {Object} props - The props for the component.
 * @param {boolean} props.isOffline - A boolean value indicating whether the user is offline.
 *
 * @returns {React.ReactElement} The offline component.
 */
const OfflineComponent = ({ isOffline }) => {
  const [timeOffline, setTimeOffline] = useState(0)

  /**
   * useEffect that sets an interval that counts the time the user has been offline
   */
  useEffect(() => {
    let intervalId = null
    if (isOffline) {
      intervalId = setInterval(() => {
        setTimeOffline((timeOffline) => timeOffline + 1)
      }, 1000)
    } else if (!isOffline && intervalId) {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [isOffline])

  if (!isOffline) {
    return null
  }

  let message
  const minutes = Math.floor(timeOffline / 60)
  const seconds = timeOffline % 60
  if (timeOffline < 60) {
    message = `You've been offline for ${timeOffline} second(s)`
  } else if (timeOffline < 3600) {
    message = `You've been offline for ${Math.floor(
      timeOffline / 60
    )} minute(s)`
  } else {
    message = `You've been offline for ${Math.floor(
      timeOffline / 3600
    )} hour(s) ${Math.floor(minutes % 60)} minute(s) ${seconds} second(s)`
  }

  const handleTryAgainClick = () => {
    if (navigator.onLine) {
      window.location.reload(false)
    } else {
      toastr.warning(
        'Warning',
        'You are still offline. Please check your internet connection and try again'
      )
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center text-center'
      style={{ height: 'calc(100vh - 72px)' }}
    >
      <h3 className='text-xl font-medium text-purple-500'>
        Oops! You are Offline
      </h3>
      {/* <p className='text-sm text-gray-500 mt-4'>{message}</p> */}
      <p className='text-sm text-gray-500 mt-4'>
        Please check your internet connection and try again.
      </p>
      <button
        className='bg-purple-500 text-white py-2 px-8 border transform transition duration-200 rounded-md hover:scale-105 mt-5'
        onClick={handleTryAgainClick}
      >
        Try again
      </button>
    </div>
  )
}

export default OfflineComponent
