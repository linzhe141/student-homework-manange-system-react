import { request, IResponse } from '@/request/request';
export function login<T>(data: T): Promise<IResponse> {
  return request.post('auth/login', data);
}

export function getStudentList<T>(params: T): Promise<IResponse> {
  return request.get('student', { params });
}

export function getStudent(id: number): Promise<IResponse> {
  return request.get('student/' + id);
}

export function createStudent<T>(data: T): Promise<IResponse> {
  return request.post('student', data);
}

export function updateStudent<T>(id: number, data: T): Promise<IResponse> {
  return request.patch('student/' + id, data);
}

export function deleteStudent(id: number): Promise<IResponse> {
  return request.delete('student/' + id);
}

export function getUserList<T>(params: T): Promise<IResponse> {
  return request.get('user', { params });
}

export function getUser(id: number): Promise<IResponse> {
  return request.get('user/' + id);
}

export function createUser<T>(data: T): Promise<IResponse> {
  return request.post('user', data);
}

export function updateUser<T>(id: number, data: T): Promise<IResponse> {
  return request.patch('user/' + id, data);
}

export function deleteUser(id: number): Promise<IResponse> {
  return request.delete('user/' + id);
}

export function updateAvatar(
  id: number,
  data: { avatarId: number },
): Promise<IResponse> {
  return request.patch(`user/${id}/updateAvatar`, data);
}
