import { notification } from 'antd';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type NotificationPlacement = 'bottomRight' | 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft';

interface INofitication {
  message: string;
  description: string;
  placement?: NotificationPlacement;
}

export const openNotification = (data: INofitication, status: NotificationType) => {
  notification[status]({
    message: data.message,
    description: data.description,
    placement: data.placement,
    closeIcon: true,
  });
};
