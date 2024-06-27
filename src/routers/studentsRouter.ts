import { Router } from "express";
import {
  getStudentsAge,
  getStudentsClass,
  getStudentsRank,
  getStudentsSumClass,
  getStudentsAvgScore,
  getStudentsUniqueClass,
  getStudentsEarlyBird,
  getStudentsScoreByAge,
  getStudentsBiggestScore,
  getStudentsNameAndScore,
} from "../controllers/studentsControllers.ts";

const router: Router = Router();

router.get("/students/age/:age", getStudentsAge);
router.get("/students/class/:class", getStudentsClass);
router.get("/students/rank", getStudentsRank);
router.get("/students/sumclass", getStudentsSumClass);
router.get("/students/avgscore", getStudentsAvgScore);
router.get("/students/uniqueclass", getStudentsUniqueClass);
router.get("/students/earlybird", getStudentsEarlyBird);
router.get("/students/scorebyage/:age", getStudentsScoreByAge);
router.get("/students/biggestscore/:class", getStudentsBiggestScore);
router.get("/students/nameandscore", getStudentsNameAndScore);

export { router as studentRouter };
