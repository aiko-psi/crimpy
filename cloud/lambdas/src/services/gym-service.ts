import { EntityManager } from "@typedorm/core";
import { Gym } from "crimpy-model/entities/gym.entity";
export class GymService {
  private readonly entityManger: EntityManager;

  constructor(entityManger: EntityManager) {
    this.entityManger = entityManger;
  }

  parseGym(body: any | undefined): Gym {
    const gym = new Gym();
    try {
      gym.name = body.name;
      gym.shortName = body.shortName;
      gym.location = body.location;
      gym.toploggerId = body.topLoggerId;
      gym.topoId = body.topoId;
      return gym;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to parse gym");
    }
  }

  async createGym(gym: Gym): Promise<Gym> {
    return await this.entityManger.create<Gym>(gym);
  }
}
