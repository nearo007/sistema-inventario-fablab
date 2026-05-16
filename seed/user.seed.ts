import bcrypt from "bcrypt";
import { prisma } from "./prisma.js";

type SeedUser = {
  username: string;
  email: string;
  password: string;
};

const users: SeedUser[] = [
  { username: "admin", email: "admin@fablab.pt", password: "admin123" },
  { username: "user", email: "user@fablab.pt", password: "user123" },
];

export async function seed() {
  const hashedUsers = await Promise.all(
    users.map(async (u) => ({
      username: u.username,
      email: u.email,
      passwordHash: await bcrypt.hash(u.password, 10),
    })),
  );

  for (const user of hashedUsers) {
    await prisma.user.create({ data: user });
  }

  console.log(`  ${users.length} utilizadores criados`);
}
