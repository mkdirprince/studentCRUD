import supertest from "supertest";
import { app } from "../../../src/index";
import { prisma } from "../../../src/utils/db";
import { NewStudentEntry, StudentEntry } from "../../../src/types/types";

const api = supertest(app);

const initialStudents: NewStudentEntry[] = [
  {
    firstName: "David",
    lastName: "Asare",
    email: "asare@gmail.com",
  },
  {
    firstName: "Jane",
    lastName: "Asare",
    email: "jasare@gmail.com",
  },
  {
    firstName: "Yaw",
    lastName: "Mensah",
    email: "mensah@gmail.com",
  },
];

beforeEach(async () => {
  await prisma.student.deleteMany();

  await prisma.student.createMany({
    data: initialStudents,
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("studentApi", () => {
  it("all students are returned", async () => {
    const response = await api.get("/api/v1/student");
    expect(response.body).toHaveLength(initialStudents.length);
  });

  it('unique identity property "id" is defined in the JSON representation', async () => {
    const student: StudentEntry | null = await prisma.student.findUnique({
      where: {
        email: "mensah@gmail.com",
      },
    });
    expect(student?.id).toBeDefined();
  });

  it("returns a student if provided a valid id", async () => {
    const newStudent: NewStudentEntry = {
      firstName: "Prince",
      lastName: "Wilson",
      email: "wils@gmail.com",
    };
    const res = await api.post("/api/v1/student").send(newStudent);
    await api.get(`/api/v1/student/${res.body.id}`).expect(200);
  });

  it("a valid student can be added", async () => {
    const newStudent: NewStudentEntry = {
      firstName: "Prince",
      lastName: "Wilson",
      email: "wils@gmail.com",
    };
    await api
      .post("/api/v1/student")
      .send(newStudent)
      .expect(201)
      .expect("Content-type", /application\/json/);
    const studentsAtEnd: StudentEntry[] = await prisma.student.findMany();
    expect(studentsAtEnd).toHaveLength(initialStudents.length + 1);
    const emails = studentsAtEnd.map((student: StudentEntry) => student.email); // Explicitly define the type here
    expect(emails).toContain("wils@gmail.com");
  });

  test("returns status code 400, Bad Request if any of email, first and lastnames are missing", async () => {
    const newStudent = {
      firstName: "Prince",
      lastName: "Wilson",
    };
    await api
      .post("/api/v1/student")
      .send(newStudent)
      .expect(400)
      .expect("Content-type", /application\/json/);
    const studentsAtEnd = await prisma.student.findMany();
    expect(studentsAtEnd).toHaveLength(initialStudents.length);
  });

  test("deleteing a student resource is successful", async () => {
    const studentsAtStart = await prisma.student.findMany();
    const studentToDelete: NewStudentEntry = {
      firstName: "Prince",
      lastName: "Wilson",
      email: "wils@gmail.com",
    };
    const result = await api.post("/api/v1/student").send(studentToDelete);
    await api.delete(`/api/v1/student/${result.body.id}`).expect(204);
    const studentsAtEnd = await prisma.student.findMany();
    expect(studentsAtEnd).toEqual(studentsAtStart);
    const emails = studentsAtEnd.map((student: StudentEntry) => student.email); // Explicitly define the type here
    expect(emails).not.toContain(studentToDelete.email);
  });

  it("successfully update information of a student", async () => {
    const studentsAtStart: StudentEntry[] = await prisma.student.findMany();
    const studentToUpdate: StudentEntry | undefined = studentsAtStart[0];
    if (studentToUpdate) {
      const updateEmail = "sonofdavid123@gmail.com";
      const updatedStudent: StudentEntry = {
        ...studentToUpdate,
        email: updateEmail,
      };
      const response = await api
        .put(`/api/v1/student/${updatedStudent.id}`)
        .send(updatedStudent)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      expect(response.body.email).toBe(updateEmail);
    }
  });
});
