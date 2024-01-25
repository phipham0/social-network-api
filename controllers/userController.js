const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user= await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: User.thoughts } });
      res.json({ message: 'User and Thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // // Add a friend to a User
  // async addFriend(req, res) {
  //   console.log('You are adding a friend');
  //   console.log(req.body);

  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $addToSet: { friends: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No user found with that ID :(' });
  //     }

  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'no user found with that id',
        });
      }
      if (!friend) {
        return res.status(404).json({
          message: 'no friend user found with that id',
        });
      }

      res.json('Created the thought');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends:  req.params.friendId } },
        { runValidators: true, new: true }
      );

      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends:  req.params.userId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
