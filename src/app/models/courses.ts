export interface Courses {
  data: [ApiObjData];

  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
export interface GetCourseData {
  data: ApiObjData[];
}

export interface ApiObjData {
  id: number;
  attributes: {
    courseDescription: string;
    createdAt: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
    assignment: {
      data: {
        id: number;
        attributes: {
          alternativeText: string | null;
          caption: string | null;
          createdAt: string;
          ext: string;
          hash: string;
          height: number;
          mime: string;
          name: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: string | null;
          size: number;
          updatedAt: string;
          url: string;
          width: number;
          formats: {
            thumbnail: {
              ext: string;
              hash: string;
              height: number;
              mime: string;
              name: string;
              path: string | null;
              size: number;
              url: string;
              width: number;
            };
          };
        };
      };
    };

    courseContent: {
      data: {
        id: number;
        data: {
          id: number;
          attributes: {
            alternativeText: string | null;
            caption: string | null;
            createdAt: string;
            ext: string;
            hash: string;
            height: number;
            mime: string;
            name: string;
            previewUrl: string | null;
            provider: string;
            provider_metadata: string | null;
            size: number;
            updatedAt: string;
            url: string;
            width: number;
            formats: {
              thumbnail: {
                ext: string;
                hash: string;
                height: number;
                mime: string;
                name: string;
                path: string | null;
                size: number;
                url: string;
                width: number;
              };
            };
          };
        };
      };
    };
  };
}



export interface UpdatedApiCourseData {
  data: {
    id: number;
    attributes: {
      courseDescription: string;
      createdAt: string;
      publishedAt: string;
      title: string;
      updatedAt: string;
    };
  };
  meta: {};
}

export interface  AddNewCourseObj {
  data: {
    assignment: number;
    courseContent: number;
    courseDescription: string;
    title: string;
  };
}
