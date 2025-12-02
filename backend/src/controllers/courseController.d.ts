import { Request, Response } from "express";
export declare const listCourses: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const _default: {
    listCourses: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=courseController.d.ts.map