import { createContext } from "react";
import { GoMortarBoard } from "react-icons/go";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SlGlobeAlt, SlEnergy, SlHeart } from "react-icons/sl";
import { HiFire, HiOutlineSparkles, HiOutlineTrophy } from "react-icons/hi2";
import { BiAbacus, BiAlarm, BiArchive, BiAtom, BiBaguette, BiBarChartSquare, BiBarChartAlt2, BiBasket, BiBath, BiBell, BiBookBookmark, BiBookHeart, BiBot, BiBrain, BiBriefcaseAlt, BiBrush, BiBug, BiBuildings, BiBulb, BiCalculator, BiCalendarAlt, BiCamera, BiCameraMovie, BiCart, BiCodeBlock, BiCodeAlt, BiConfused, BiCookie, BiCool, BiCrown, BiCycling, BiData, BiDesktop, BiExtension, BiFolder, BiGame, BiGhost, BiGift, BiGitBranch, BiGitRepoForked, BiGlobe, BiHappy, BiHappyBeaming, BiLogoFacebook, BiLogoFigma, BiLogoGit, BiLogoGithub, BiLogoInstagram, BiLogoLinkedin, BiLogoPostgresql, BiLogoMicrosoftTeams, BiLogoVisualStudio, BiLogoWhatsapp, BiMessageRoundedEdit, BiMoneyWithdraw, BiMoviePlay, BiMusic, BiNote, BiPencil, BiSolidBalloon, BiSolidFlorist, BiSolidPlanet, BiStar, BiUpsideDown, BiWinkSmile, BiWinkTongue, BiWorld, BiWrench } from "react-icons/bi";

const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const { item: projects, updateInfo: setProjects, loading, error } = useLocalStorage('PROJECTS_V1', []);

  const projectsPalette = [
    { id: 0, name:'Blue', primaryColor: 'bg-light-blue', secondaryColor: 'bg-very-light-blue' },
    { id: 1, name:'Green', primaryColor: 'bg-light-green', secondaryColor: 'bg-very-light-green' },
    { id: 2, name:'Pink', primaryColor: 'bg-light-pink', secondaryColor: 'bg-very-light-pink' },
    { id: 3, name:'Yellow', primaryColor: 'bg-light-yellow', secondaryColor: 'bg-very-light-yellow' },
    { id: 4, name:'Menta', primaryColor: 'bg-menta', secondaryColor: 'bg-light-menta' },
    { id: 5, name:'Purple', primaryColor: 'bg-light-purple', secondaryColor: 'bg-very-light-purple' },
  ];

  const projectIcons = [
    { id: 0, component: <BiAbacus/> },
    { id: 1, component: <BiAlarm/>},
    { id: 2, component: <BiArchive/>},
    { id: 3, component: <BiAtom/>},
    { id: 4, component: <BiBaguette/>},
    { id: 5, component: <BiBarChartSquare/>},
    { id: 6, component: <BiBarChartAlt2/>},
    { id: 7, component: <BiBasket/>},
    { id: 8, component: <BiBath/>},
    { id: 9, component: <BiBell/>},
    { id: 10, component: <BiBookBookmark/>},
    { id: 11, component: <BiBookHeart/>},
    { id: 12, component: <BiBot/>},
    { id: 13, component: <BiBrain/>},
    { id: 14, component: <BiBriefcaseAlt/>},
    { id: 15, component: <BiBrush/>},
    { id: 16, component: <BiBug/>},
    { id: 17, component: <BiBuildings/>},
    { id: 18, component: <BiBulb/>},
    { id: 19, component: <BiCalculator/>},
    { id: 20, component: <BiCalendarAlt/>},
    { id: 21, component: <BiCamera/>},
    { id: 22, component: <BiCameraMovie/>},
    { id: 23, component: <BiCart/>},
    { id: 24, component: <BiCodeBlock/>},
    { id: 25, component: <BiCodeAlt/>},
    { id: 26, component: <BiConfused/>},
    { id: 27, component: <BiCookie/>},
    { id: 28, component: <BiCool/>},
    { id: 29, component: <BiCrown/>},
    { id: 30, component: <BiCycling/>},
    { id: 31, component: <BiData/>},
    { id: 32, component: <BiDesktop/>},
    { id: 33, component: <BiExtension/>},
    { id: 34, component: <BiFolder/>},
    { id: 35, component: <BiGame/>},
    { id: 36, component: <BiGhost/>},
    { id: 37, component: <BiGift/>},
    { id: 38, component: <BiGitBranch/>},
    { id: 39, component: <BiGitRepoForked/>},
    { id: 40, component: <BiGlobe/>},
    { id: 41, component: <BiHappy/>},
    { id: 42, component: <BiHappyBeaming/>},
    { id: 43, component: <BiLogoFacebook/>},
    { id: 44, component: <BiLogoFigma/>},
    { id: 45, component: <BiLogoGit/>},
    { id: 46, component: <BiLogoGithub/>},
    { id: 47, component: <BiLogoInstagram/>},
    { id: 48, component: <BiLogoLinkedin/>},
    { id: 49, component: <BiLogoPostgresql/>},
    { id: 50, component: <BiLogoMicrosoftTeams/>},
    { id: 51, component: <BiLogoVisualStudio/>},
    { id: 52, component: <BiLogoWhatsapp/>},
    { id: 53, component: <BiMessageRoundedEdit/>},
    { id: 54, component: <BiMoneyWithdraw/>},
    { id: 55, component: <BiMoviePlay/>},
    { id: 56, component: <BiMusic/>},
    { id: 57, component: <BiNote/>},
    { id: 58, component: <BiPencil/>},
    { id: 59, component: <BiSolidBalloon/>},
    { id: 60, component: <BiSolidFlorist/>},
    { id: 61, component: <BiSolidPlanet/>},
    { id: 62, component: <BiStar/>},
    { id: 63, component: <BiUpsideDown/>},
    { id: 64, component: <BiWinkSmile/>},
    { id: 65, component: <BiWinkTongue/>},
    { id: 66, component: <BiWorld/>},
    { id: 67, component: <BiWrench/>},
    { id: 68, component: <GoMortarBoard/>},
    { id: 69, component: <HiFire/>},
    { id: 70, component: <HiOutlineSparkles/>},
    { id: 71, component: <HiOutlineTrophy/>},
    { id: 72, component: <SlGlobeAlt/>},
    { id: 73, component: <SlEnergy/>},
    { id: 74, component: <SlHeart/>},
  ]

  function generateUniqueId() {
    return Date.now(); // It uses the timestamp as id
  }

  function createProject(name, paletteId, iconId, description) {
    const newProject = {
      id: generateUniqueId(),
      name: name,
      icon: iconId,
      paletteId: paletteId,
      description: description,
      tasks: []
    };

    setProjects([...projects, newProject]);
  }

  // Delete a project by id
  function deleteProject(projectId) {
    setProjects(projects.filter( p => p.id != projectId ));
  }

  function changeProjectIcon(projectId, iconId) {
    const newProjects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          icon: iconId
        };
      } else {
        return p;
      }
    });
    setProjects(newProjects);
  }

  function changeNameProject(projectId, newName) {
    newName == '' ? newName = 'New Project' : null;
    const newProjects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          name: newName
        };
      } else {
        return p;
      }
    });
    setProjects(newProjects);
  }

  function changePaletteProject(projectId, idPalette) {
    const newProjects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          paletteId: idPalette
        };
      } else {
        return p;
      }
    });
    setProjects(newProjects);
  }

  function changeProjectDescription(projectId, newDescription) {
    const newProjects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          description: newDescription
        };
      } else {
        return p;
      }
    });
    setProjects(newProjects);
  }

  function addTaskToProject(projectId, taskId) {
    removeTaskFromProject(taskId);
    setProjects(projects.map((p) => {
      if (p.id === projectId) {
        if (p.tasks === undefined) {
          return {
            ...p,
            tasks: [taskId]
          };
        } else {
          return {
            ...p,
            tasks: [...p.tasks, taskId]
          };
        }
      } else {
        return p;
      }
    }));
  }

  function removeTaskFromProject(taskId) {
    setProjects(projects.map((p) => {
      if (p.tasks != undefined && p.tasks.includes(taskId)) {
        const newTasks = p.tasks.filter((taskIdInProject) => taskIdInProject != taskId);
        return {
          ...p,
          tasks: newTasks
        };
      } else {
        return p;
      }
    }));
  }

  return (
    <ProjectContext.Provider value={{
      error,
      loading,
      projects,
      projectIcons,
      projectsPalette,
      createProject,
      deleteProject,
      addTaskToProject,
      changeProjectIcon,
      changeNameProject,
      changePaletteProject,
      removeTaskFromProject,
      changeProjectDescription,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export { ProjectContext, ProjectProvider }