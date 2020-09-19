<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Box;
use App\Entity\Card;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /** @var UserPasswordEncoderInterface */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for ($u=0; $u < 10; $u++) { 
            $user = new User();

            $hash = $this->encoder->encodePassword($user, "password");

            $user->setFirstName($faker->firstName())
                ->setLastName($faker->lastName)
                ->setEmail($faker->email)
                ->setPassword($hash);

            $manager->persist($user);

            for ($b=0; $b < 5; $b++) { 
                $box = new Box();
                $box->setTitle($faker->title())
                    ->setUser($user);
    
                $manager->persist($box);
    
                for ($c=0; $c < mt_rand(5, 20); $c++) { 
                    $card = new Card();
                    $card->setRecto($faker->word())
                        ->setVerso($faker->word())
                        ->setNextAt(new \DateTime("+3 days"))
                        ->setCompartment($faker->numberBetween(1, 7))
                        ->setFace($faker->randomElement(['recto', 'verso']))
                        ->setBox($box);
        
                    $manager->persist($card);
                }
            }
        }


        $manager->flush();
    }
}
