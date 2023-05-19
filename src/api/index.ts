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
