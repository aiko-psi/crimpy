import { EntityManager } from "@typedorm/core";
import { Gym } from "../entities/gym.entity";

export class GymService {
  private readonly entityManger: EntityManager;

  constructor(entityManger: EntityManager) {
    this.entityManger = entityManger;
  }

  parseGym(body: string | undefined): Gym {
    const gym = new Gym();
    const parsed = JSON.parse(body || "");
    gym.name = parsed.name;
    gym.shortName = parsed.shortName;
    gym.location = parsed.location;
    gym.toploggerId = parsed.topLoggerId;
    gym.topoId = parsed.topoId;
    return gym;
  }

  async createGym(gym: Gym): Promise<Gym> {
    return await this.entityManger.create<Gym>(gym);
  }
}
