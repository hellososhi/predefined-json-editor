type Objects = {
  name: string;
  category: string;
  prompt: string;
  grasp_option: string;
};

type Locations = {
  name: string;
  parent: string;
};

type Names = {
  female: string[];
  male: string[];
};

type Categories = {
  name: string;
  location: string;
};

export type { Objects, Locations, Names, Categories };
