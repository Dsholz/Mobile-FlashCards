import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'

export const subscribeToNotifications = async () => {
  return await Permissions.askAsync(Permissions.NOTIFICATIONS)
}

export const clearAllNotifications = async () => {
  return await Notifications.cancelAllScheduledNotificationsAsync()
}

export const setReminderNotification = async () => {
  return await Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then(async ({ status }) => {
      if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()

        const sendDate = new Date()
        sendDate.setDate(sendDate.getDate() + 1)
        sendDate.setHours(10)
        sendDate.setMinutes(45)
        sendDate.setSeconds(0)

        return await Notifications.scheduleLocalNotificationAsync({
          title: 'Mobile Flashcards App',
          body: 'You have not done any quiz yet today!',
          android: {
            color: 'blue'
          },
        }, {
          time: sendDate,
          repeat: 'day'
        })
      }
    })
}