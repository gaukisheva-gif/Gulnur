import {Linking, PermissionsAndroid, Platform} from 'react-native';

/**
 * Requests the CAMERA permission on Android (iOS shows its own system prompt
 * automatically when the camera is launched, driven by NSCameraUsageDescription).
 * Must only be called after the user has already seen an in-app rationale.
 */
export async function ensureCameraPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }
  const already = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  if (already) {
    return true;
  }
  const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    title: 'Доступ к камере',
    message: 'Камера нужна только для фотографирования инвойсов и других документов при подготовке декларации.',
    buttonPositive: 'Разрешить',
    buttonNegative: 'Отмена',
  });
  return result === PermissionsAndroid.RESULTS.GRANTED;
}

export function openAppSettings() {
  Linking.openSettings();
}
