import { LocalNotifications } from "@capacitor/local-notifications";

export const setupNotification = async ({
    time = "19:00",
}: {
    time?: string;
}) => {
    localStorage.setItem("notificationTime", time);
    const perms = await LocalNotifications.checkPermissions();
    console.log(perms);
    if (!perms) {
        try {
            await LocalNotifications.requestPermissions();
        } catch {
            console.log("Permission denied");
            return;
        }
    }
    LocalNotifications.schedule({
        notifications: [
            {
                title: "Hey! It's time to check you Pantry.",
                body: "Update your pantry and plans meals for tomorrow!",
                id: 1,
                schedule: {
                    allowWhileIdle: true,
                    on: {
                        hour: Number(time.split(":")[0]),
                        minute: Number(time.split(":")[1]),
                    },
                },
            },
        ],
    });
};
