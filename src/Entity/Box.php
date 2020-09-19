<?php

namespace App\Entity;

use App\Repository\BoxRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BoxRepository::class)
 */
class Box
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\OneToMany(targetEntity=Card::class, mappedBy="box", orphanRemoval=true)
     */
    private $card;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="boxes")
     */
    private $user;

    public function __construct()
    {
        $this->card = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection|Card[]
     */
    public function getCard(): Collection
    {
        return $this->card;
    }

    public function addCard(Card $card): self
    {
        if (!$this->card->contains($card)) {
            $this->card[] = $card;
            $card->setBox($this);
        }

        return $this;
    }

    public function removeCard(Card $card): self
    {
        if ($this->card->contains($card)) {
            $this->card->removeElement($card);
            // set the owning side to null (unless already changed)
            if ($card->getBox() === $this) {
                $card->setBox(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
