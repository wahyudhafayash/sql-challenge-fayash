import { Request, Response } from "express";
import database from "../config/database.ts";
import { QueryError, QueryResult } from "mysql2";
import { Students } from "../models/studentsModel.ts";

export const getStudentsAge = (req: Request, res: Response) => {
  const age = req.params.age;
  const query = "SELECT * FROM students_data WHERE age = ?";

  database.query(
    query,
    [age],
    (err: QueryError | null, result: QueryResult) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};
export const getStudentsClass = (req: Request, res: Response) => {
  const studentClass = req.params.class;
  const query =
    "SELECT nama,class,exam_score FROM students_data WHERE class = ?";

  database.query(
    query,
    [studentClass],
    (err: QueryError | null, result: QueryResult) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        return res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};

export const getStudentsRank = (req: Request, res: Response) => {
  database.query(
    "SELECT * FROM students_data ORDER BY exam_score DESC",
    (err: QueryError, result: Students[]) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        return res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};

export const getStudentsSumClass = (req: Request, res: Response) => {
  database.query(
    "SELECT class, COUNT(*) FROM students_data GROUP BY class",
    (err: QueryError, result: Students[]) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        return res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};

export const getStudentsAvgScore = (req: Request, res: Response) => {
  database.query(
    "SELECT class, AVG(exam_score) FROM students_data GROUP BY class LIMIT 2",
    (err: QueryError, result: Students[]) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        return res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};

export const getStudentsUniqueClass = (req: Request, res: Response) => {
  database.query(
    "SELECT class FROM students_data GROUP BY class HAVING COUNT(*) = 1",
    (err: QueryError, result: Students[]) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        return res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};

export const getStudentsEarlyBird = (req: Request, res: Response) => {
  database.query(
    "SELECT nama, enrollment_date FROM students_data ORDER BY enrollment_date ASC LIMIT 5",
    (err: QueryError, result: Students[]) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        return res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};

export const getStudentsNameAndScore = (req: Request, res: Response) => {
  const { age, exam_score } = req.query;
  const query =
    "SELECT nama, exam_score FROM students_data WHERE age > ? AND exam_score > ?";
  const StudentKey = [age, exam_score];

  database.query(
    query,
    StudentKey,
    (err: QueryError | null, result: QueryResult) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        return res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};

export const getStudentsScoreByAge = (req: Request, res: Response) => {
  const age = req.params.age;
  const query =
    "SELECT nama, age, avg(exam_score) FROM students_data WHERE age = ? GROUP BY age";

  database.query(
    query,
    [age],
    (err: QueryError | null, result: QueryResult) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        return res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};

export const getStudentsBiggestScore = (req: Request, res: Response) => {
  const studentClass = req.params.class;
  const query =
    "SELECT DISTINCT nama, exam_score, class FROM students_data WHERE class = ? ORDER BY exam_score DESC LIMIT 1";

  database.query(
    query,
    [studentClass],
    (err: QueryError | null, result: QueryResult) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        res.status(200).send({
          data: result,
        });
      } else {
        return res.status(404).send({
          message: "data not found",
        });
      }
    }
  );
};
